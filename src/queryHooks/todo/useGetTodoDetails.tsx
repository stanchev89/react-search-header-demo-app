import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { ITodo } from '../../interfaces/todo';
import { useQuery } from '@tanstack/react-query';
import { JsonPlaceholderService } from '../../services/JsonPlaceholderService';
import { AxiosError } from 'axios';

export const GET_TODO_DETAILS_QUERY_KEY = 'get-todo-details';

interface IProps extends IBaseUseQueryProps<ITodo> {
  id: number;
}

export default function useGetTodoDetails(props: IProps) {
  return useQuery({
    queryKey: [GET_TODO_DETAILS_QUERY_KEY, props.id],
    queryFn: () => JsonPlaceholderService.getTodoDetails(props.id),
    onError:(err: AxiosError) => {
      alert(err.message);
      props?.onError?.(err);
    },
    ...props
  })
}