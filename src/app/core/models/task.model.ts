import { People } from './people.model';

export interface TaskResponse {
  data: TaskData[];
  meta: Meta;
}

export interface TaskData {
  id: number;
  attributes: TaskAttributes;
}

export interface TaskAttributes {
  name: string;
  deadline: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  people: People;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
