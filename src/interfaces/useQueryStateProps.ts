import { Dispatch, SetStateAction } from 'react';
import { BaseObj } from '../types/baseObj';

export interface IUseQueryStateProps<T extends BaseObj> {
  state: T, 
  setState: Dispatch<SetStateAction<T>>,
  parser?: {
    [key: string]: (val: string) => any
  },
  wildcards?: (keyof T)[];
  arrays?: (keyof T)[];
}