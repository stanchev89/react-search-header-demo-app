import { useQuery } from '@tanstack/react-query';
import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { IUser, IUserBase } from '../../interfaces/user';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';
import { RequestParams } from '../../types/requestParams';
import { IListResponse } from '../../interfaces/listResponse';

export const GET_USERS_QUERY_KEY = 'get-users';

interface IProps extends IBaseUseQueryProps<IListResponse<IUser>> {
  params: RequestParams<IUserBase>;
}

export const useGetUsers = ({ params, ...props }: IProps) => {
  return useQuery({
    queryKey: [GET_USERS_QUERY_KEY, params],
    queryFn: () => JsonPlaceholderService.getUsers(params),
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