import {PaginatedResult} from '../../../services/ApiService/types/PaginatedResult';
import {Filter} from './Filter';

export interface EntityService<TModel, TFilter extends Filter = Filter> {
  paginate(params: Partial<TFilter>): Promise<PaginatedResult<TModel>>
  get(filter: TFilter): Promise<TModel | null>
  getById(id: number): Promise<TModel | null>
  getMany(filter: TFilter): Promise<TModel[] | null>
  deleteById(id: number): void
}
