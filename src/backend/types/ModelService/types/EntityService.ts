import {PaginatedResult} from '../../../services/ApiService/types/PaginatedResult';
import {Filter} from './Filter';

export interface EntityService<TModel, TFilter extends Filter = Filter> {
  paginate(params: Partial<TFilter>): Promise<PaginatedResult<TModel>>
  get(filter: TFilter): Promise<TModel | null>
  getById(id: number): Promise<TModel | null>
  getMany(filter: TFilter): Promise<TModel[] | null>
  deleteById(id: number): void
}
export interface UserEntityService<TModel, TFilter = Filter> {
  paginateForUser(params: Partial<TFilter>): Promise<PaginatedResult<TModel>>
  getForUser(filter: TFilter): Promise<TModel | null>
  getByIdForUser(id: number): Promise<TModel | null>
  getManyForUser(filter: TFilter): Promise<TModel[] | null>
  deleteByIdUser(id: number): void
}
