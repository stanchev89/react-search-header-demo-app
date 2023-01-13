import { BaseObj } from '../types/baseObj';

export interface IPaginationState extends BaseObj {
  _page: number;
  _limit: number;
}