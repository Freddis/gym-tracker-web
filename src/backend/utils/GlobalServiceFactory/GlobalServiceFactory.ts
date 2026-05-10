import {AuthService} from 'src/backend/services/AuthService/AuthService';
import {DrizzleService} from 'src/backend/services/DrizzleService/DrizzleService';
import {serverConfig} from '../ServerConfig/config';
import {ApiService} from '../../services/ApiService/ApiService';
import {ImageService} from '../../services/ImageService/ImageService';
import {existsSync, mkdirSync} from 'fs';
import {ArgusService} from '../../services/ArgusService/ArgusService';
import {ExerciseService} from '../../services/ExerciseService/ExerciseService';
import {ServerConfig} from '../ServerConfig/ServerConfig';
import {DbSyncService} from '../../services/DbSyncService/DbSyncService';
import {ManagerService} from '../../services/ManagerService/ManagerService';
import {WorkoutService} from 'src/backend/services/WorkoutService/WorkoutService';
import {EntryService} from '../../services/EntryService/EntryService';
import {UserService} from '../../services/UserService/UserService';
import {WeightService} from '../../services/WeightService/WeightService';
import {ArgusCheckinService} from '../../services/ArgusCheckinService/ArgusCheckinService';
import {WorkoutPlanService} from '../../services/WorkoutPlanService/WorkoutPlanService';
import {WorkoutTypeService} from '../../services/WorkoutTypeService/WorkoutTypeService';
import {TranslationService} from '../../services/TranslationService/TranslationService';
import {EmailService} from '../../services/EmailService/EmailService';
import {OutdoorRunService} from '../../services/OutdoorRunService/OutdoorRunService';
import {OutdoorWalkService} from '../../services/OutdoorWalkService/OutdoorWalkService';
import {FoodService} from '../../services/FoodService/FoodService';
import {ManagedImageService} from '../../services/ImageService/ManagedImageService';
import {CoreUserService} from '../../services/CoreUserService/CoreUserService';
import {SettingsService} from '../../services/SettingsService/SettingsService';

export class GlobalServiceFactory {
  protected allocatedDestroyables = {drizzle: false};
  protected drizzleCached?: DrizzleService;
  protected prodDrizzleCached?: DrizzleService;
  protected config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
  }

  async cleanup() {
    if (this.drizzleCached) {
      await this.drizzleCached.end();
    }
    if (this.prodDrizzleCached) {
      await this.prodDrizzleCached.end();
    }
  }

  async image() {
    return new ImageService(await this.managedImage());
  }

  async managedImage(): Promise<ManagedImageService> {
    return new ManagedImageService(await this.drizzle());
  }

  async drizzle(): Promise<DrizzleService> {
    if (!this.drizzleCached) {
      this.drizzleCached = new DrizzleService(serverConfig.services.drizzle);
    }
    return this.drizzleCached;
  }

  async auth(): Promise<AuthService> {
    const managerService = await this.manager();
    const userService = await this.coreUser();
    const email = await this.email();
    return new AuthService(
      serverConfig.services.auth,
      userService,
      managerService,
      email
    );
  }

  async openApi(): Promise<ReturnType<ApiService['createOpenApi']>> {
    const helper = new ApiService(this, this.config.baseUrl);
    const api = helper.createOpenApi();
    return api;
  }

  async argus(): Promise<ArgusService | null> {
    const config = this.config.services.argus;
    if (!config) {
      return null;
    }
    const tempPath = config.tempFolderPath;
    if (!existsSync(tempPath)) {
      mkdirSync(tempPath);
    }
    const service = new ArgusService(await this.exercise(), await this.drizzle(), config);
    return service;
  }

  async exercise(): Promise<ExerciseService> {
    return new ExerciseService(
      await this.drizzle(),
      await this.translation(),
      await this.image(),
    );
  }

  async workout(): Promise<WorkoutService> {
    return new WorkoutService(await this.drizzle(), await this.exercise());
  }

  async entry() {
    return new EntryService(
        await this.drizzle(),
        await this.user(),
        await this.workout(),
        await this.weight(),
        await this.image(),
        await this.outdoorRun(),
        await this.outdoorWalk(),
    );
  }

  async argusCheckin() {
    return new ArgusCheckinService(
      await this.drizzle(),
      await this.image(),
      await this.entry(),
    );
  }

  async food() {
    return new FoodService(await this.drizzle(), await this.image());
  }

  async weight() {
    return new WeightService(await this.drizzle());
  }
  async outdoorRun() {
    return new OutdoorRunService(await this.drizzle());
  }
  async outdoorWalk() {
    return new OutdoorWalkService(await this.drizzle());
  }

  async dbSync(): Promise<DbSyncService | null> {
    const localDrizzle = await this.drizzle();
    if (!this.config.services.dbSync) {
      return null;
    }
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    this.prodDrizzleCached = this.prodDrizzleCached ?? new DrizzleService(this.config.services.dbSync);
    const prodDrizzle = this.prodDrizzleCached;
    const service = new DbSyncService(localDrizzle, prodDrizzle);
    return service;
  }

  async workoutType(): Promise<WorkoutTypeService> {
    return new WorkoutTypeService(await this.drizzle(), await this.exercise());

  }
  async workoutPlan(): Promise<WorkoutPlanService> {
    return new WorkoutPlanService(await this.drizzle());
  }
  async manager(): Promise<ManagerService> {
    return new ManagerService(await this.drizzle());
  }
  async user(): Promise<UserService> {
    return new UserService(await this.coreUser());
  }
  async coreUser(): Promise<CoreUserService> {
    return new CoreUserService(await this.drizzle(), await this.image());
  }
  async settings(): Promise<SettingsService> {
    return new SettingsService(await this.coreUser(), await this.entry(), await this.image());
  }
  async translation(): Promise<TranslationService> {
    return new TranslationService(await this.drizzle());
  }

  async email(): Promise<EmailService> {
    return new EmailService(this.config.services.email);
  }
}
