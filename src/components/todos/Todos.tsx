import { FullWidthColumnFlexbox } from '../common/boxes';
import { useState } from 'react';
import { ISearchHeaderInputProps } from '../../interfaces/searchHeaderProps';
import { generateSearchInputProps } from '../../utils/generateSearchInputProps';
import { getStateFromInputProps } from '../../utils/getStateFromInputProps';
import { useQueryParamState } from '../../hooks/useQueryParamState';
import SearchHeader from '../common/search-header/SearchHeader';
import { ITodo, todoKeys } from '../../interfaces/todo';
import DataListWithPagination from '../common/DataListWithPagination';
import { useGetTodos } from '../../queryHooks/todo/useGetTodos';
import EntityDetailsModal from '../common/EntityDetailsModal';
import useGetTodoDetails from '../../queryHooks/todo/useGetTodoDetails';

const inputProps: ISearchHeaderInputProps<keyof ITodo>[] = generateSearchInputProps(todoKeys, {
  numberKeys: ['id', 'userId'],
  select: {
    completed: {
      list: [true, false],
      getValue: (val: boolean) => val.toString(),
      getLabel: (val: boolean) => val.toString(),
    }
  }
});
const initialState = getStateFromInputProps<ITodo>(inputProps);

const Todos = () => {
  const [state, setState] = useState(initialState);
  const { queryParamState, isPrePopulated } = useQueryParamState({ state, setState, });
  const { data, isLoading } = useGetTodos({ params: queryParamState });

  return (
    <FullWidthColumnFlexbox>

      <SearchHeader initialState={initialState} params={state} setParams={setState} inputProps={inputProps}
                    prePopulated={isPrePopulated}
      />

      <DataListWithPagination data={data} isLoading={isLoading} page={state._page} limit={state._limit}
                              onChange={setState}
      />
      
      <EntityDetailsModal useGetDetailsQuery={useGetTodoDetails}/>

    </FullWidthColumnFlexbox>
  );
};

export default Todos;