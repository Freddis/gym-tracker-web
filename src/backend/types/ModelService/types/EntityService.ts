import {PaginatedResult} from '../../../services/ApiService/types/PaginatedResult';
import {Filter} from './Filter';

export interface EntityService<TModel, TId extends string | number = number, TFilter extends Filter<TId> = Filter<TId>> {
  paginate(params: Partial<TFilter>): Promise<PaginatedResult<TModel>>
  get(filter: TFilter): Promise<TModel | null>
  getById(id: TId): Promise<TModel | null>
  getMany(filter: TFilter): Promise<TModel[]>
  deleteById(id: TId): void
}
export interface UserEntityService<TModel, TFilter = Filter> {
  paginateForUser(params: Partial<TFilter>): Promise<PaginatedResult<TModel>>
  getForUser(filter: TFilter): Promise<TModel | null>
  getByIdForUser(id: number): Promise<TModel | null>
  getManyForUser(filter: TFilter): Promise<TModel[] | null>
  deleteByIdUser(id: number): void
}
