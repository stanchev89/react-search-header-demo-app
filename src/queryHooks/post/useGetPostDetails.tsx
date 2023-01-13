import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { IPost } from '../../interfaces/post';
import { useQuery } from '@tanstack/react-query';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';

export const GET_POST_DETAILS_QUERY_KEY = 'get-post-details';

interface IProps extends IBaseUseQueryProps<IPost> {
  id: number;
}

export default function useGetPostDetails(props: IProps) {
  return useQuery({
    queryKey: [GET_POST_DETAILS_QUERY_KEY, props.id],
    queryFn: () => JsonPlaceholderService.getPostDetails(props.id),
    onError: (err: AxiosError) => {
      alert(err.message);
      props?.onError?.(err);
    },
    ...props
  });
}