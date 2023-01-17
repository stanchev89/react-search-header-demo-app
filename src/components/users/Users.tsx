import { FullWidthColumnFlexbox } from '../common/boxes';
import { useState } from 'react';
import { ISearchHeaderInputProps } from '../../interfaces/searchHeaderProps';
import { IUserBase, userBaseKeys } from '../../interfaces/user';
import { generateSearchInputProps } from '../../utils/generateSearchInputProps';
import { getStateFromInputProps } from '../../utils/getStateFromInputProps';
import { useQueryParamState } from '../../hooks/useQueryParamState';
import SearchHeader from '../common/search-header/SearchHeader';
import DataListWithPagination from '../common/DataListWithPagination';
import { useGetUsers } from '../../queryHooks/user/useGetUsers';
import EntityDetailsModal from '../common/EntityDetailsModal';
import useGetUserDetails from '../../queryHooks/user/useGetUserDetails';

const inputProps: ISearchHeaderInputProps<keyof IUserBase>[] = generateSearchInputProps(userBaseKeys, { numberKeys: ['id'] });
const initialState = getStateFromInputProps<IUserBase>(inputProps);

const Users = () => {
  const [state, setState] = useState(initialState);
  const { queryParamState, isPrePopulated } = useQueryParamState({ state, setState });
  const { data, isFetching } = useGetUsers({ params: queryParamState, enabled: isPrePopulated });

  return (
    <FullWidthColumnFlexbox>
      <SearchHeader initialState={initialState} params={state} setParams={setState} inputProps={inputProps}/>
      <DataListWithPagination data={data} isLoading={isFetching} page={state._page} limit={state._limit}
                              onChange={setState}
      />

      <EntityDetailsModal useGetDetailsQuery={useGetUserDetails}/>

    </FullWidthColumnFlexbox>
  );
};

export default Users;