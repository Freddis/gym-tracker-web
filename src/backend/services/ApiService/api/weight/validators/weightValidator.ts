import {weightRowValidator} from '../../../../DrizzleService/types/WeightRow';
import {RouteFactory} from '../../../utils/RouteFactory';

export const weightValidator = RouteFactory.validators.describeShape(weightRowValidator, {
  weight: 'Weight value in orbitrary units',
  id: 'Id of the weight record',
  externalId: 'Id of the record in external source if it was imported.',
  userId: 'Id of the user',
  units: 'Units in which this weight record is calculdated',
  createdAt: 'The date record was created',
  updatedAt: 'The date record was updated',
  deletedAt: 'The date record was deleted',
}).openapi({
  ref: 'Weight',
  description: 'Weight record added by user',
});
