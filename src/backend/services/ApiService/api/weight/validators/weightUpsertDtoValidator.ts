import {number} from 'zod';
import {weightRowValidator} from '../../../../DrizzleService/types/WeightRow';
import {RouteFactory} from '../../../utils/RouteFactory';

const validator = weightRowValidator.omit({
  userId: true,
  externalId: true,
  id: true,
}).extend({
  id: number().optional(),
  createdAt: RouteFactory.validators.strings.datetime,
  updatedAt: RouteFactory.validators.strings.datetime.nullable(),
  deletedAt: RouteFactory.validators.strings.datetime.nullable(),
});
export const weightUpsertDtoValidator = RouteFactory.validators.describeShape(validator, {
  weight: 'Weight value in orbitrary units',
  id: 'Id of the weight record',
  units: 'Units in which this weight record is calculdated',
  createdAt: 'The date record was created',
  updatedAt: 'The date record was updated',
  deletedAt: 'The date record was deleted',
}).openapi({
  ref: 'WeightUpsertDto',
  description: 'Fields needed to upsert a weight record',
});
