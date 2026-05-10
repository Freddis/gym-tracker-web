import {User} from './types/User';
import {UserFilter} from '../CoreUserService/types/UserFilter';
import {CoreUserService} from '../CoreUserService/CoreUserService';
import {EntityService} from '../../types/ModelService/types/EntityService';
import {PaginatedResult} from '../ApiService/types/PaginatedResult';
import {CoreUser} from '../CoreUserService/types/CoreUser';

export class UserService implements EntityService<User, number, UserFilter> {
  protected coreUserService: CoreUserService;
  constructor(coreUserService: CoreUserService) {
    this.coreUserService = coreUserService;
  }
  async paginate(params: Partial<UserFilter>): Promise<PaginatedResult<User>> {
    const result = await this.coreUserService.paginate(params);
    return {
      items: await this.decorate(result.items),
      info: result.info,
    };
  }
  async get(filter: UserFilter): Promise<User | null> {
    const result = await this.coreUserService.get(filter);
    return result ? this.decorateRow(result) : null;
  }

  async getById(id: number): Promise<User | null> {
    const result = await this.coreUserService.getById(id);
    return result ? this.decorateRow(result) : null;
  }
  async getMany(filter: UserFilter): Promise<User[]> {
    const result = await this.coreUserService.getMany(filter);
    return result.map((x) => this.decorateRow(x));
  }
  async deleteById(id: number): Promise<void> {
    await this.coreUserService.deleteById(id);
  }

  protected async decorate(rows: CoreUser[]): Promise<User[]> {
    return rows.map((x) => this.decorateRow(x));
  }
  protected decorateRow(row: CoreUser): User {
    const result: User = {
      id: row.id,
      name: row.name,
      profilePicture: row.profilePicture,
    };
    return result;
  }

}
