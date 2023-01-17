import { UseQueryResult } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { IBaseUseQueryProps } from '../../interfaces/baseQueryProps';
import { Dialog, IconButton, Typography } from '@mui/material';
import { FlexBox, FlexBoxFullWidth, FullWidthColumnFlexbox } from './boxes';
import { Loader } from './Loader';
import { Close } from '@mui/icons-material';
import { testIds } from '../../core/testIds';

interface IProps {
  useGetDetailsQuery: (params: IBaseUseQueryProps<any> & { id: number }) => UseQueryResult<any, any>;
}
export const DETAILS_MODAL_QUERY_PARAM = '_details';

const EntityDetailsModal = ({ useGetDetailsQuery }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const entityId = useMemo(() => searchParams.get(DETAILS_MODAL_QUERY_PARAM), [searchParams]);

  const closeModalHandler = useCallback(() => {
    searchParams.delete(DETAILS_MODAL_QUERY_PARAM);
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const { data, isFetching } = useGetDetailsQuery({
    id: Number(entityId),
    enabled: !!entityId && !isNaN(+entityId),
    onError: () => closeModalHandler(),
    retry: 0,
  });
  
  return (
    <>
      <span data-testid={testIds.entityDetailsModal}></span>
      {
        data &&
        <Dialog open={true} onClose={closeModalHandler} PaperProps={{
          style: {
            borderRadius: 8,
            padding: 20,
            overflow: 'hidden',
            width: 800,
          }
        }}
        >
          <FlexBoxFullWidth justifyContent={'space-between'} alignItems={'center'} position={'relative'}>
            <FlexBox alignItems={'start'}>
              <Typography variant={'h5'} letterSpacing={1.5}>{'Details'}</Typography>
            </FlexBox>
            <IconButton onClick={closeModalHandler}>
              <Close/>
            </IconButton>
          </FlexBoxFullWidth>
          <FullWidthColumnFlexbox>
            {
              Object.keys(data).map(key => (
                <FlexBoxFullWidth key={key} alignItems={'flex-start'} p={1} borderBottom={1}>
                  <Typography variant={'body1'} fontWeight={700} sx={{ mr: 2 }}>{key}: </Typography>
                  <Typography variant={'body1'}>{JSON.stringify(data[key])}</Typography>
                </FlexBoxFullWidth>
              ))
            }
          </FullWidthColumnFlexbox>
        </Dialog>
      }
      {
        isFetching || (entityId && !data) && <Loader/>
      }
    </>
  );
};

export default EntityDetailsModal;