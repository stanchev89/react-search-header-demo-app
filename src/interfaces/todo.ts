import { BaseObj } from '../types/baseObj';

export interface ITodo extends BaseObj{
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const todoKeys: Array<keyof ITodo> = ['id', 'userId', 'title', 'completed'];