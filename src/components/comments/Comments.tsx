import { FullWidthColumnFlexbox } from '../common/boxes';
import { useState } from 'react';
import { ISearchHeaderInputProps } from '../../interfaces/searchHeaderProps';
import { generateSearchInputProps } from '../../utils/generateSearchInputProps';
import { getStateFromInputProps } from '../../utils/getStateFromInputProps';
import { useQueryParamState } from '../../hooks/useQueryParamState';
import SearchHeader from '../common/search-header/SearchHeader';
import { commentKeys, IComment } from '../../interfaces/comment';
import { useGetComments } from '../../queryHooks/comment/useGetComments';
import { RequestParams } from '../../types/requestParams';
import DataListWithPagination from '../common/DataListWithPagination';
import { DEFAULT_SIZE_OPTIONS } from '../common/AppPaginationWithSize';
import EntityDetailsModal from '../common/EntityDetailsModal';
import useGetCommentDetails from '../../queryHooks/comment/useGetCommentDetails';

const inputProps: ISearchHeaderInputProps<keyof IComment>[] = generateSearchInputProps(commentKeys, {
  numberKeys: ['id', 'postId']
});
const initialState = getStateFromInputProps<RequestParams<IComment>>(inputProps);

const Comments = () => {
  const [state, setState] = useState(initialState);
  const { queryParamState, isPrePopulated } = useQueryParamState({ 
    state,
    setState,
    parser: {
      _limit: (value: string) => DEFAULT_SIZE_OPTIONS.find(option => option === +value) 
        || DEFAULT_SIZE_OPTIONS.filter(el => el < +value).pop(),
    }
  });
  const { data, isLoading } = useGetComments({ params: queryParamState });

  return (
    <FullWidthColumnFlexbox>
      {
        isPrePopulated &&
        <SearchHeader initialState={initialState} params={state} setParams={setState} inputProps={inputProps}/>
      }
      <DataListWithPagination data={data} isLoading={isLoading} page={state._page} limit={state._limit}
                              onChange={setState}
      />
      
      <EntityDetailsModal useGetDetailsQuery={useGetCommentDetails}/>

    </FullWidthColumnFlexbox>
  );
};

export default Comments;