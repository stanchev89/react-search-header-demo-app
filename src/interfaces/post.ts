import { BaseObj } from '../types/baseObj';

export interface IPost extends BaseObj{
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const postKeys: Array<keyof IPost> = ['id', 'userId', 'title', 'body'];