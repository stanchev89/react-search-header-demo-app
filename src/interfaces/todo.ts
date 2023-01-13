export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const todoKeys: Array<keyof ITodo> = ['id', 'userId', 'title', 'completed'];