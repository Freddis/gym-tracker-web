import {DrizzleService} from '../DrizzleService/DrizzleService';
import {compare, hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import {AuthServiceConfig} from './types/AuthServiceConfig';
import {Logger} from 'src/common/utils/Logger/Logger';
import {z} from 'zod';
import {User} from 'src/backend/model/User/User';
import {Client} from './types/Client';
import {ActionErrorCode} from '../ApiService/types/ActionErrorCode';
import {ActionError} from '../ApiService/errors/ActionError';

export class AuthService {
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
      throw new ActionError(ActionErrorCode.InvalidPassword);
    }
    const passwordsMatch = await compare(password, user.password);
    if (!passwordsMatch) {
      throw new ActionError(ActionErrorCode.InvalidPassword);
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
    const db = await this.dbService.getDb();
    const schema = this.dbService.getSchema();
    if (params.password !== params.passwordConfirmation) {
      throw new ActionError(ActionErrorCode.InvalidPassword);
    }
    const existing = await db.query.users.findFirst({
      where: (users, {eq}) => eq(users.email, params.email),
    });
    if (existing) {
      throw new ActionError(ActionErrorCode.EmailAlreadyExists);
    }
    const hashedPassword = await this.hashString(params.password);
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
    if (!user) {
      throw new Error("User hasn't been inserted");
    }
    const token = this.createToken(user);
    return {...user, jwt: token};
  }
  async hashString(str: string): Promise<string> {
    return await hash(str, this.config.hashSalt);
  }
  public createToken(user: Client): string {
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
