import { NewsMedia } from './newsmedia.type';

export interface News {
  media?: NewsMedia | null;
  resource_url?: string | null;
  slug?: string | null;
  summary?: string | null;
  title?: string | null;
  lang?: string | null;
  search_score?: number | null;
  creation_time?: string | null;
}
