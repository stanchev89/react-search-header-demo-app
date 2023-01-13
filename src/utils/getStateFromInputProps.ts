import { ISearchHeaderInputProps } from '../interfaces/searchHeaderProps';
import { RequestParams } from '../types/requestParams';
import { BaseObj } from '../types/baseObj';
import { DEFAULT_SIZE_OPTIONS } from '../components/common/AppPaginationWithSize';

export const getStateFromInputProps = <T extends BaseObj>(inputProps: ISearchHeaderInputProps[], withPagination = true): RequestParams<T> => {
  return inputProps.reduce((acc: RequestParams<T>, cur: ISearchHeaderInputProps<keyof T>) => {
    acc[cur.name] = '' as any;
    return acc;
  }, withPagination ? {
    _page: 1,
    _limit: DEFAULT_SIZE_OPTIONS[0],
  } as RequestParams<T> : {} as RequestParams<T>);
};