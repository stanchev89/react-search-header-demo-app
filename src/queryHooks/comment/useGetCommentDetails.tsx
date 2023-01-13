import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { IComment } from '../../interfaces/comment';
import { useQuery } from '@tanstack/react-query';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';

export const GET_COMMENT_DETAILS_QUERY_KEY = 'get-comment-details';

interface IProps extends IBaseUseQueryProps<IComment> {
  id: number;
}

export default function useGetCommentDetails(props: IProps) {
  return useQuery({
    queryKey: [GET_COMMENT_DETAILS_QUERY_KEY, props.id],
    queryFn: () => JsonPlaceholderService.getCommentDetails(props.id),
    onError: (err: AxiosError) => {
      alert(err.message);
      props?.onError?.(err);
    },
    ...props
  });
}