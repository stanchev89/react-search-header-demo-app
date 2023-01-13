import { FullWidthColumnFlexbox } from '../common/boxes';
import { useState } from 'react';
import { ISearchHeaderInputProps } from '../../interfaces/searchHeaderProps';
import { generateSearchInputProps } from '../../utils/generateSearchInputProps';
import { getStateFromInputProps } from '../../utils/getStateFromInputProps';
import { useQueryParamState } from '../../hooks/useQueryParamState';
import SearchHeader from '../common/search-header/SearchHeader';
import { IPost, postKeys } from '../../interfaces/post';
import DataListWithPagination from '../common/DataListWithPagination';
import { useGetPosts } from '../../queryHooks/post/useGetPosts';
import EntityDetailsModal from '../common/EntityDetailsModal';
import useGetPostDetails from '../../queryHooks/post/useGetPostDetails';

const inputProps: ISearchHeaderInputProps<keyof IPost>[] = generateSearchInputProps(postKeys, {
  numberKeys: ['id', 'userId']
});
const initialState = getStateFromInputProps(inputProps);

const Posts = () => {
  const [state, setState] = useState(initialState);
  const { queryParamState, isPrePopulated } = useQueryParamState({ state, setState, });
  const { data, isLoading } = useGetPosts({ params: queryParamState });

  return (
    <FullWidthColumnFlexbox>

      <SearchHeader initialState={initialState} params={state} setParams={setState} inputProps={inputProps}
                    prePopulated={isPrePopulated}
      />

      <DataListWithPagination data={data} isLoading={isLoading} page={state._page} limit={state._limit}
                              onChange={setState}
      />
      
      <EntityDetailsModal useGetDetailsQuery={useGetPostDetails}/>
      
    </FullWidthColumnFlexbox>
  );
};

export default Posts;