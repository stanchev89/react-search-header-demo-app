import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { IUser } from '../../interfaces/user';
import { useQuery } from '@tanstack/react-query';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';

export const GET_USER_DETAILS_QUERY_KEY = 'get-user-details';

interface IProps extends IBaseUseQueryProps<IUser> {
  id: number;
}

export default function useGetUserDetails(props: IProps) {
  return useQuery({
    queryKey: [GET_USER_DETAILS_QUERY_KEY, props.id],
    queryFn: () => JsonPlaceholderService.getUserDetails(props.id),
    onError:(err: AxiosError) => {
      alert(err.message);
      props?.onError?.(err);
    },
    ...props
  })
}