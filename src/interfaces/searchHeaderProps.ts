import { BaseObj } from '../types/baseObj';
import { Dispatch, SetStateAction } from 'react';
import { SxProps } from '@mui/material';

export interface ISearchHeaderProps<T extends BaseObj = {}> {
  initialState: T;
  params: T;
  setParams: Dispatch<SetStateAction<T>>;
  inputProps: ISearchHeaderInputProps<keyof T>[];
  initialExpanded?: boolean;
}

export interface ISearchHeaderInputProps<T = string> {
  name: T;
  label: string;
  select?: {
    list: any[],
    getValue: (arg: any) => string | number,
    getLabel: (arg: any) => string
  };
  sx?: SxProps,
  isNumber?: boolean;
}