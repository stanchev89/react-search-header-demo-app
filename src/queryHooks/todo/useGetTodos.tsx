import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { ITodo } from '../../interfaces/todo';
import { useQuery } from '@tanstack/react-query';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';
import { RequestParams } from '../../types/requestParams';
import { IListResponse } from '../../interfaces/listResponse';

export const GET_TODOS_QUERY_KEY = 'get todos';

interface IProps extends IBaseUseQueryProps<IListResponse<ITodo>> {
  params: RequestParams<ITodo>;
}

export const useGetTodos = ({ params, enabled, ...props }: IProps) => {
  return useQuery({
    queryKey: [GET_TODOS_QUERY_KEY, params],
    queryFn: () => JsonPlaceholderService.getTodos(params),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: !!Object.keys(params).length && (enabled ?? true),
    onError: (err: AxiosError) => {
      alert(err.message);
      props?.onError?.(err);
    },
    ...props,
  });
};