import { ISearchHeaderInputProps } from '../interfaces/searchHeaderProps';
import { camelToTitleCase } from './camelToTitleCase';

interface IProps<T> {
  numberKeys?: T[];
  select?: {
    [key: string]: {
      list: any[];
      getValue: (arg: any) => string | number;
      getLabel: (arg: any) => string;
    }
  };
}

export const generateSearchInputProps = <T>(keys: T[], props: IProps<T> = {}): ISearchHeaderInputProps<T>[] => {
  return keys.map((key) => {
    return {
      name: key,
      label: camelToTitleCase(key as string),
      isNumber: (props.numberKeys || []).includes(key),
      select: props.select?.[key as string]
    };
  });
};

