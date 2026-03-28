import {DrizzleService} from '../DrizzleService/DrizzleService';
import {compare, hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import {AuthServiceConfig} from './types/AuthServiceConfig';
import {Logger} from 'src/backend/utils/Logger/Logger';
import {z} from 'zod';
import {AuthUser} from './types/AuthUser';
import {ActionErrorCode} from '../ApiService/types/ActionErrorCode';
import {ActionError} from '../ApiService/errors/ActionError';
import {ManagerService} from '../ManagerService/ManagerService';
import {Manager} from '../ManagerService/types/Manager';
import {EmailService} from '../EmailService/EmailService';
import {UserService} from '../UserService/UserService';
import {User} from '../UserService/types/User';

export class AuthService {
  protected dbService: DrizzleService;
  protected config: AuthServiceConfig;
  protected logger = new Logger(AuthService.name);
  protected managerService: ManagerService;
  protected emailService: EmailService;
  protected userService: UserService;

  constructor(
    config: AuthServiceConfig,
    drizzleService: DrizzleService,
    userService: UserService,
    managerService: ManagerService,
    emailService: EmailService,
  ) {
    this.logger = new Logger(AuthService.name);
    this.config = config;
    this.dbService = drizzleService;
    this.managerService = managerService;
    this.userService = userService;
    this.emailService = emailService;
  }

  async getUserFromRequest(request: Request): Promise<User | null> {
    const id = this.getRoleIdFromRequest(request);
    if (!id) {
      return null;
    }
    const user = await this.userService.getById(id);
    return user;
  }

  async getManagerFromRequest(request: Request): Promise<Manager | null> {
    const id = this.getRoleIdFromRequest(request);
    if (!id) {
      return null;
    }
    return this.managerService.getById(id);
  }
  async login(email: string, password: string): Promise<AuthUser> {
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

  async sendPasswordResetEmail(email: string, baseUrl: string): Promise<void> {
    const user = await this.userService.get({email});
    if (!user) {
      this.logger.info(`Couldn't find user with email '${email}' for password reset`);
      return;
    }
    const token = jwt.sign(
      {
        time: new Date().toISOString(),
        email: email,
      },
      this.config.jwtSecret,
      {
        expiresIn: '10m',
      }
    );
    const encodedToken = token;
    const url = baseUrl + `/${encodedToken}`;
    const subject = 'Password reset';
    const bodyLines = [
      '<p>We received a request to reset your password.</p>',
      "<p>If that wasn't you please ignore this email</p>",
      `<a href="${url}">Restore Password</a>`,
    ];
    await this.emailService.send(email, subject, bodyLines.join('\n'));
  }

  async resetPassword(token: string, password: string, passwordConfirmation: string): Promise<AuthUser> {
    try {
      jwt.verify(token, this.config.jwtSecret);
    } catch (e: unknown) {
      this.logger.error("Can't verify JWT token", e);
      throw new ActionError(ActionErrorCode.PasswordResetTokenExpired);
    }
    const value = jwt.decode(token);
    if (!value) {
      throw new ActionError(ActionErrorCode.PasswordResetTokenMalformed);
    }
    const validatedData = z.object({email: z.string()}).safeParse(value);
    if (!validatedData.success) {
      throw new ActionError(ActionErrorCode.PasswordResetTokenMalformed);
    }
    const user = await this.userService.get({email: validatedData.data.email});
    if (!user) {
      this.logger.info(`Couldn't find user with email '${validatedData.data.email}' for password reset finalization`);
      throw new ActionError(ActionErrorCode.PasswordResetTokenMalformed);
    }
    if (password !== passwordConfirmation) {
      throw new ActionError(ActionErrorCode.InvalidPassword);
    }
    const hashedPassword = await this.hashString(password);
    await this.userService.update(user.id, {
      password: hashedPassword,
    });

    const authJwt = this.createToken({
      ...user,
      email: validatedData.data.email,
    });
    return {
      ...user,
      email: validatedData.data.email,
      jwt: authJwt,
    };
  }

  async loginManager(email: string, password: string): Promise<AuthUser> {
    const user = await this.managerService.getByEmail(email);
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
  ): Promise<AuthUser> {
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

  async registerManager(
    params: {
      name: string;
      email: string;
      password: string;
    }
  ): Promise<AuthUser> {
    const existing = await this.managerService.getByEmail(params.email);
    if (existing) {
      throw new ActionError(ActionErrorCode.EmailAlreadyExists);
    }
    const hashedPassword = await this.hashString(params.password);
    const manager = await this.managerService.create({
      ...params,
      password: hashedPassword,
      profilePicture: null,
    });
    const token = this.createToken(manager);
    return {...manager, jwt: token};
  }

  async hashString(str: string): Promise<string> {
    return await hash(str, this.config.hashSalt);
  }

  public createToken(user: Omit<AuthUser, 'jwt'>): string {
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

  protected getRoleIdFromRequest(request: Request): number | null {
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
    return validatedData.data.id;
  }
}
