import {managerRowValidator} from '../../../../../DrizzleService/types/ManagerRow';
import {RouteFactory} from '../../../../utils/RouteFactory';
import {OpenApiDescriptions} from '../../../../types/OpenApiDescriptions';
import {Manager} from '../../../../../ManagerService/types/Manager';


const managerValidatorDescriptions: OpenApiDescriptions<Manager> = {
  id: 'Id of the manager',
  name: 'Name',
  email: 'Work Email. Used for CRM login',
  profilePicture: 'Profile picture',
  password: 'Hashed Password',
  createdAt: 'Date manager was added to CRM',
  updatedAt: 'Last time manager was updated',
  deletedAt: "The date manager deleted from CRM. Deleted managers don't appear on most pages",
};
const validator = managerRowValidator;

export const managerValidator = RouteFactory.validators.describeShape(validator, managerValidatorDescriptions).openapi({
  ref: 'Manager',
  description: 'Manager. Managers that work with CRM',
}); ;
