import {number} from 'zod';
import {RouteFactory} from '../../../utils/RouteFactory';
import {outdoorRunValidator} from './outdoorRunValidator';

export const outdoorRunUpsertDtoValidator = outdoorRunValidator.omit({
  userId: true,
  id: true,
}).extend({
  id: number().optional().openapi({description: 'Id of the outdoor run'}),
  start: RouteFactory.validators.strings.datetime.openapi({description: 'Start time of the outdoor run'}),
  end: RouteFactory.validators.strings.datetime.openapi({description: 'End time of the outdoor run'}),
}).openapi({ref: 'OutdoorRunUpsertDto', description: 'Outdoor run upsert dto'});
