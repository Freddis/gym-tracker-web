import {imageUpsertDtoValidator} from '../../entries/validators/imageUpsertDtoValidator';
import {settingsValidator} from './settingsValidator';

export const settingsUpdateDtoValidator = settingsValidator.omit({
  profilePicture: true,
}).extend({
  profilePicture: imageUpsertDtoValidator.nullable().optional().openapi({description: 'Profile picture of the user'}),
}).openapi({ref: 'SettingsUpdateDto', description: 'Settings update data'});
