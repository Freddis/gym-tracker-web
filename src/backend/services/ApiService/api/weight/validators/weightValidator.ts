import {number} from 'zod';
import {WeightRow, weightRowValidator} from '../../../../DrizzleService/types/WeightRow';
import {OpenApiDescriptions} from '../../../types/OpenApiDescriptions';
import {RouteFactory} from '../../../utils/RouteFactory';

const descriptions: OpenApiDescriptions<WeightRow> = {
  weight: 'Weight value in orbitrary units',
  id: 'Id of the weight record',
  externalId: 'Id of the record in external source if it was imported.',
  userId: 'Id of the user',
  units: 'Units in which this weight record is calculdated',
  createdAt: 'The date record was created',
  updatedAt: 'The date record was updated',
  deletedAt: 'The date record was deleted',

};
const validator = weightRowValidator.extend({
  history: RouteFactory.validators.describeShape(weightRowValidator, descriptions).array(),
  historySize: number(),
});

export const weightValidator = RouteFactory.validators.describeShape(validator, {
  ...descriptions,
  history: 'History of weight records for this user',
  historySize: 'Size of the history in days',
}).openapi({
  ref: 'Weight',
  description: 'Weight record added by user',
});
