import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { IPost } from '../../interfaces/post';
import { useQuery } from '@tanstack/react-query';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';
import { RequestParams } from '../../types/requestParams';
import { IListResponse } from '../../interfaces/listResponse';

export const GET_POSTS_QUERY_KEY = 'get-posts';

interface IProps extends IBaseUseQueryProps<IListResponse<IPost>> {
  params: RequestParams<IPost>;
}

export const useGetPosts = ({ params, enabled,  ...props }: IProps) => {
  return useQuery({
    queryKey: [GET_POSTS_QUERY_KEY, params],
    queryFn: () => JsonPlaceholderService.getPosts(params),
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