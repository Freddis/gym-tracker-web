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
import {CoreUserService} from '../CoreUserService/CoreUserService';
import {CoreUser} from '../CoreUserService/types/CoreUser';
import {Country} from '../../types/Country';
import {Gender} from '../../types/Gender';
export class AuthService {
  protected config: AuthServiceConfig;
  protected logger = new Logger(AuthService.name);
  protected managerService: ManagerService;
  protected emailService: EmailService;
  protected userService: CoreUserService;

  constructor(
    config: AuthServiceConfig,
    userService: CoreUserService,
    managerService: ManagerService,
    emailService: EmailService,
  ) {
    this.logger = new Logger(AuthService.name);
    this.config = config;
    this.managerService = managerService;
    this.userService = userService;
    this.emailService = emailService;
  }

  async getUserFromRequest(request: Request): Promise<CoreUser | null> {
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
    const user = await this.userService.get({email});
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

  protected async sendPasswordConfirmationEmail(user: CoreUser, routeUrl: string): Promise<void> {
    const email = user.email;
    const token = jwt.sign(
      {
        time: new Date().toISOString(),
        email: email,
      },
      this.config.jwtSecret,
      {
        expiresIn: '1d',
      }
    );
    const encodedToken = token;
    const url = routeUrl + `/${encodedToken}`;
    const subject = 'Welcome to Discipline';
    const bodyLines = [
      '<p>Welcome to Discipline! Please confirm your email to continue.</p>',
      `<a href="${url}">Confirm Email</a>`,
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
      ...user,
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
    return {...user, jwt: token, profilePicture: null};
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string, confirmation: string): Promise<AuthUser> {
    const user = await this.userService.getById(userId);
    if (!user) {
      throw new ActionError(ActionErrorCode.UserNotFound);
    }
    const passwordsMatch = await compare(oldPassword, user.password);
    if (!passwordsMatch) {
      throw new ActionError(ActionErrorCode.InvalidPassword);
    }
    if (newPassword !== confirmation) {
      throw new ActionError(ActionErrorCode.PasswordConfirmationMismatch);
    }
    const hashedPassword = await this.hashString(newPassword);
    await this.userService.update(user.id, {
      ...user,
      password: hashedPassword,
    });
    const token = this.createToken(user);
    return {...user, jwt: token};
  }

  async register(
    params: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
      gender: Gender;
      country: Country;
      birthDate: Date;
      height: number;
    },
    routeUrl?: string,
  ): Promise<AuthUser> {
    if (params.password !== params.passwordConfirmation) {
      throw new ActionError(ActionErrorCode.InvalidPassword);
    }
    const existing = await this.userService.get({email: params.email});
    if (existing) {
      throw new ActionError(ActionErrorCode.EmailAlreadyExists);
    }
    const hashedPassword = await this.hashString(params.password);
    const user = await this.userService.create({
      name: params.name,
      email: params.email,
      hashedPassword,
      gender: params.gender,
      country: params.country,
      birthDate: params.birthDate,
      height: params.height,
    });
    const token = this.createToken(user);
    if (routeUrl) {
      await this.sendPasswordConfirmationEmail(user, routeUrl);
    }
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
    return {...manager, jwt: token, profilePicture: null};
  }

  async hashString(str: string): Promise<string> {
    return await hash(str, this.config.hashSalt);
  }

  public createToken(user: {id: number, name: string, email: string}): string {
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
      this.logger.error("Can't verify JWT token", e);
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
