import { IListResponse } from '../../interfaces/listResponse';
import { Loader } from './Loader';
import { FlexBox, FullWidthColumnFlexbox } from './boxes';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { AppPaginationWithSize } from './AppPaginationWithSize';
import ListItem from './ListItem';
import { Dispatch, RefObject, SetStateAction, useCallback, useRef } from 'react';
import { RequestParams } from '../../types/requestParams';
import { useSearchParams } from 'react-router-dom';
import { DETAILS_MODAL_QUERY_PARAM } from './EntityDetailsModal';
import { testIds } from '../../core/testIds';
import ViewportListRender from './viewport-list-render/ViewportListRender';
import { BaseObj } from '../../types/baseObj';

interface IProps {
  data?: IListResponse<any>,
  isLoading: boolean,
  page: number,
  limit: number,
  onChange: Dispatch<SetStateAction<RequestParams>>
}

const DataListWithPagination = ({ isLoading, data, limit, page, onChange }: IProps) => {
  const bottomRef = useRef<Element>(null);
  const topRef = useRef<Element>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const scrollToElement = useCallback((ref?: RefObject<Element>) => {
    ref?.current?.scrollIntoView();
  }, []);

  const onItemClickHandler = useCallback((item: BaseObj & { id: number }) => {
    searchParams.set(DETAILS_MODAL_QUERY_PARAM, item.id.toString());
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <Paper elevation={2} sx={{ mt: 2, borderRadius: 4, p: 2, pb: 4 }}>
      <Box ref={topRef}/>
      <span data-testid={testIds.dataListWithPagination}></span>
      {
        isLoading && <Loader/>
      }
      {
        !!data?.list.length &&
        <FullWidthColumnFlexbox>
          <FlexBox my={2} flexDirection={{ xs: 'column', md: 'row' }}>
            <AppPaginationWithSize pageSize={limit} totalCount={data.totalCount} page={page} onChange={onChange}/>
            {
              data.list.length >= 10 &&
              <IconButton onClick={() => scrollToElement(bottomRef)} sx={{ borderRadius: 2 }}>
                <Typography variant={'body2'}>{'Scroll to bottom'}</Typography>
              </IconButton>
            }

          </FlexBox>

          <ViewportListRender list={data.list} ListItemComponent={ListItem} onClick={onItemClickHandler}/>
          
          {/*Rendering without optimisations*/}
          {/*  data.list.map(item => (*/}
          {/*    <Box key={item.id} onClick={() => onItemClickHandler(item)}>*/}
          {/*      <ListItem item={item}/>*/}
          {/*    </Box>*/}
          {/*  ))*/}

          <Box ref={bottomRef}/>

          {
            data.list.length >= 10 &&
            <FlexBox mt={2} flexDirection={{ xs: 'column', md: 'row' }}>
              <AppPaginationWithSize pageSize={limit} totalCount={data.totalCount} page={page} onChange={onChange}/>
              <IconButton onClick={() => scrollToElement(topRef)} sx={{ borderRadius: 2 }}>
                <Typography variant={'body2'}>{'Scroll to top'}</Typography>
              </IconButton>
            </FlexBox>
          }
        </FullWidthColumnFlexbox>

      }
      {
        (!data || !data.list.length) && !isLoading && <Typography sx={{ mt: 2 }}>{'No Records Found'}</Typography>
      }
    </Paper>
  );
};

export default DataListWithPagination;