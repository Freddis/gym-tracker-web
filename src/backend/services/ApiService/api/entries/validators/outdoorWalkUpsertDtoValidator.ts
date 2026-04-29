import {outdoorRunUpsertDtoValidator} from './outdoorRunUpsertDtoValidator';

export const outdoorWalkUpsertDtoValidator = outdoorRunUpsertDtoValidator.openapi({
  ref: 'OutdoorWalkUpsertDto',
  description: 'Outdoor walk upsert dto',
});
