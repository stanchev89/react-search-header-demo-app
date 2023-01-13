import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { IComment } from '../../interfaces/comment';
import { useQuery } from '@tanstack/react-query';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';
import { IListResponse } from '../../interfaces/listResponse';
import { RequestParams } from '../../types/requestParams';

export const GET_COMMENTS_QUERY_KEY = 'get-comments';

interface IProps extends IBaseUseQueryProps<IListResponse<IComment>> {
  params: RequestParams<IComment>;
}

export const useGetComments = ({ params, ...props }: IProps) => {
  return useQuery({
    queryKey: [GET_COMMENTS_QUERY_KEY, params],
    queryFn: () => JsonPlaceholderService.getComments(params),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: !!Object.keys(params).length,
    onError: (err: AxiosError) => {
      alert(err.message);
      props?.onError?.(err);
    },
    ...props,
  });
};