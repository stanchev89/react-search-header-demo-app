import { BaseObj } from '../types/baseObj';

export interface IComment extends BaseObj{
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const commentKeys: Array<keyof IComment> = ['id', 'postId', 'name', 'email', 'body'];