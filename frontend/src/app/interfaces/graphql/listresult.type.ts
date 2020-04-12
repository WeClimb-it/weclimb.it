import { Item } from './item.union';
import { Pagination } from './pagination.type';

export interface ListResult {
  items?: Item[] | null;
  pagination?: Pagination | null;
}
