import { IPaginationState } from '../interfaces/paginatedState';
import { BaseObj } from './baseObj';

export type RequestParams<T extends BaseObj = {}> = Partial<T> & IPaginationState; 