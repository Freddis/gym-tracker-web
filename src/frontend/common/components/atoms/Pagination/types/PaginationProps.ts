import {PageChangeHandler} from './PageChangeHandler';

export interface PaginationProps {
  info: {
    pageSize: number,
    count: number,
    page: number
  },
  className?:string
  onPageChanged: PageChangeHandler,
}
