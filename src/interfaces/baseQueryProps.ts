import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface IBaseUseQueryProps<T = unknown, TQueryKey extends QueryKey = QueryKey> extends Omit<UseQueryOptions<T, AxiosError<any>, T, TQueryKey>,
  'initialData'> {
  initialData?: () => undefined;
}