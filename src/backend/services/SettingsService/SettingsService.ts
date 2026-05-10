import {randomUUID} from 'node:crypto';
import {CoreUserService} from '../CoreUserService/CoreUserService';
import {EntryService} from '../EntryService/EntryService';
import {EntryType} from '../EntryService/types/EntryType';
import {ImageService} from '../ImageService/ImageService';
import {Image} from '../ImageService/types/Image';
import {User} from '../UserService/types/User';
import {Settings} from './types/Settings';
import {ImageType} from '../../types/ImageType';
import {SettingsUpdateDto} from './types/SettingsUpdateDto';

export class SettingsService {
  protected userService: CoreUserService;
  protected entryService: EntryService;
  protected imageService: ImageService;
  constructor(
    coreUserService: CoreUserService,
    entryService: EntryService,
    imageService: ImageService
  ) {
    this.userService = coreUserService;
    this.entryService = entryService;
    this.imageService = imageService;
  }

  async update(user: User, settings: SettingsUpdateDto): Promise<Settings> {
    const coreUser = await this.userService.getById(user.id);
    if (!coreUser) {
      throw new Error('User not found');
    }
    let profilePicture: Image | null | undefined;
    if (settings.profilePicture) {
      profilePicture = await this.imageService.createFromBase64(settings.profilePicture.data, randomUUID(), ImageType.UserProfile);
    }
    await this.userService.update(user.id, {
      password: coreUser.password,
      email: coreUser.email,
      name: settings.name,
      note: settings.note,
      height: settings.height,
      gender: settings.gender,
      birthDate: settings.birthDate,
      country: settings.country,
      heightUnit: settings.units.height,
      weightUnit: settings.units.weight,
      temperatureUnit: settings.units.temperature,
      distanceUnit: settings.units.distance,
      visibility: settings.security.visibility,
      profilePicture: profilePicture,
    });
    return this.getForUser(user);
  }
  async getForUser(user: User): Promise<Settings> {
    const coreUser = await this.userService.getById(user.id);
    if (!coreUser) {
      throw new Error('User not found');
    }
    const entries = await this.entryService.getAll({
      userId: [user.id],
      type: [EntryType.Weight],
      perPage: 1,
    });
    const weight = entries.items[0];
    const weightValue = weight?.weight.weight;
    const result: Settings = {
      name: coreUser.name,
      note: coreUser.note,
      height: coreUser.height,
      weight: weightValue ?? null,
      gender: coreUser.gender,
      birthDate: coreUser.birthDate,
      country: coreUser.country,
      profilePicture: coreUser.profilePicture,
      units: {
        weight: coreUser.weightUnit,
        distance: coreUser.distanceUnit,
        height: coreUser.heightUnit,
        temperature: coreUser.temperatureUnit,
      },
      security: {
        email: coreUser.email,
        visibility: coreUser.visibility,
      },
    };
    return result;
  }
}
