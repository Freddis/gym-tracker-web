import {Client} from 'src/server/services/OpenApiService/types/Client';
import {OpenApiAuthService} from 'src/server/services/OpenApiService/types/OpenApiAuthService';
import {DrizzleService} from '../DrizzleService/DrizzleService';
import {compare, hash} from 'bcrypt';
import {OpenApiActionErrorCode} from 'src/server/services/OpenApiService/enums/OpenApiActionErrorCode';
import {OpenApiActionError} from 'src/server/services/OpenApiService/types/errors/OpenApiActionError';
import jwt from 'jsonwebtoken';
import {AuthServiceConfig} from './types/AuthServiceConfig';
import {Logger} from 'src/utls/Logger/Logger';
import {z} from 'zod';
import {User} from 'src/server/model/User/User';

export class AuthService implements OpenApiAuthService {
  protected dbService: DrizzleService;
  protected config: AuthServiceConfig;
  protected logger = new Logger(AuthService.name);

  constructor(config: AuthServiceConfig, drizzleService: DrizzleService) {
    this.config = config;
    this.dbService = drizzleService;
  }

  async getClientFromRequest(request: Request): Promise<User | null> {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return null;
    }
    const jwtToken = authHeader.replaceAll('Bearer', '').trim();
    try {
      jwt.verify(jwtToken, this.config.jwtSecret);
    } catch (e: unknown) {
      this.logger.error("Can't verify JWT tokern", e);
      return null;
    }
    const value = jwt.decode(jwtToken);
    if (!value) {
      return null;
    }
    const validatedData = z.object({id: z.number()}).safeParse(value);
    if (!validatedData.success) {
      return null;
    }
    const db = await this.dbService.getDb();
    const user = await db.query.users.findFirst({
      where: (table, {eq}) => eq(table.id, validatedData.data.id),
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async login(email: string, password: string): Promise<Client & {jwt: string}> {
    const db = await this.dbService.getDb();
    const user = await db.query.users.findFirst({
      where: (users, {eq}) => eq(users.email, email),
    });
    if (!user) {
      throw new OpenApiActionError(OpenApiActionErrorCode.invalidPassword);
    }
    const passwordsMatch = await compare(password, user.password);
    if (!passwordsMatch) {
      throw new OpenApiActionError(OpenApiActionErrorCode.invalidPassword);
    }
    const token = this.createToken(user);
    return {...user, jwt: token};
  }

  async register(
    params: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    }
  ): Promise<Client & {jwt: string}> {
    const service = new DrizzleService();
    const db = await service.getDb();
    const schema = await service.getSchema();
    if (params.password !== params.passwordConfirmation) {
      throw new OpenApiActionError(OpenApiActionErrorCode.invalidPassword);
    }
    const existing = await db.query.users.findFirst({
      where: (users, {eq}) => eq(users.email, params.email),
    });
    if (existing) {
      throw new OpenApiActionError(OpenApiActionErrorCode.emailAlreadyExists);
    }
    const hashedPassword = await hash(params.password, this.config.hashSalt);
    const entity: typeof schema.users.$inferInsert = {
      name: params.name,
      email: params.email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const users = await db.insert(schema.users).values(entity).returning({
      id: schema.users.id,
      email: schema.users.email,
      name: schema.users.name,
    });
    const user = users[0];
    const token = this.createToken(user);
    return {...user, jwt: token};
  }

  protected createToken(user: Client): string {
    const token = jwt.sign(
      {
        time: new Date().toISOString(),
        id: user.id,
        name: user.name,
        email: user.email,
      },
      this.config.jwtSecret,
      {
        expiresIn: '100d',
      }
    );
    return token;
  }
}
