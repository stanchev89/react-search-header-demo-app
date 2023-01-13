import { Box, Typography, FormControl, IconButton, MenuItem, TextField, useTheme, } from '@mui/material';
import { FlexBox } from '../common/boxes';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { RequestParams } from '../../types/requestParams';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

interface IProps {
  pageSize: number;
  totalCount: number;
  page: number;
  onChange: Dispatch<SetStateAction<RequestParams>>;
}

export const DEFAULT_SIZE_OPTIONS = [10, 20, 50, 100];

export const AppPaginationWithSize = ({ totalCount, pageSize, onChange, page }: IProps) => {
  const theme = useTheme();

  const handleSizeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newSize = +e.target.value;
    if (newSize * page > totalCount) {
      return onChange(prev => ({ ...prev, _limit: newSize, _page: Math.ceil(totalCount / newSize) }));
    }
    onChange(prev => ({ ...prev, _limit: newSize }));
  }, [page, totalCount, onChange]);

  const handlePageChange = useCallback((value: number) => onChange(prev => ({
    ...prev,
    _page: value
  })), [onChange]);

  const availableSizes = useMemo(() => {
    return DEFAULT_SIZE_OPTIONS.filter((size, i) => i === 0 || size <= totalCount);
  }, [totalCount]);

  const pageNums = useMemo<(number | string)[]>(() => {
    const count = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0;
    const arr: Array<number | string> = new Array(count).fill(null).map((_, i) => i + 1);
    if (arr.length <= 5) { return arr;}
    const mainNums = page + 4 > arr.length
      ? arr.slice(arr.length - 5, arr.length - 1)
      : page - 2 > 0 ? arr.slice(page - 2, page + 2) : arr.slice(1, 5);
    return [arr[0]]
      .concat(Math.abs(+arr[0] - (+mainNums[0])) > 1 ? '...' : [])
      .concat(mainNums)
      .concat(Math.abs(+arr[arr.length - 1] - (+mainNums[mainNums.length - 1])) > 1 ? '...' : [])
      .concat(arr[arr.length - 1]);
  }, [totalCount, pageSize, page]);

  return (
    <FlexBox alignItems={'center'} flexDirection={{ xs: 'column', md: 'row' }}>
      <FormControl sx={{ mb: { xs: 1, md: 0 } }}>
        <TextField onChange={handleSizeChange} select label={'Size'} color={'primary'}
                   value={availableSizes.includes(pageSize) ? pageSize : availableSizes[0]}
                   size={'small'} sx={{ borderRadius: 3 }}>
          {
            availableSizes.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))
          }
        </TextField>
      </FormControl>
      <FlexBox ml={1} alignItems={'center'}>
        <IconButton sx={{ p: { xs: 0, md: 1 }, mx: { xs: .5, md: 1 } }}
                    onClick={() => handlePageChange(page - 1 > 0 ? page - 1 : page)}>
          <KeyboardArrowLeft/>
        </IconButton>
        {
          pageNums.map((num, i) => (
            !isNaN(+num) ? (
                <Box
                  key={num}
                  sx={{
                    padding: .6, margin: 0, border: num === page ? 1 : 'unset', borderColor: theme.palette.grey['A400'],
                    borderRadius: 1.5, '&:hover': { cursor: 'pointer', backgroundColor: theme.palette.grey['A200'] }
                  }}
                  onClick={() => handlePageChange(+num)}
                >
                  <Typography color={num === page ? 'primary' : 'default'}
                              fontWeight={num === page ? 600 : 200}>{num}</Typography>
                </Box>
              )
              : (<Typography key={`${i}...`} sx={{ md: .5 }}>...</Typography>
              )))
        }
        <IconButton sx={{ p: { xs: 0, md: 1 }, mx: { xs: .5, md: 1 } }}
                    onClick={() => handlePageChange(page + 1 <= pageNums[pageNums.length - 1] ? page + 1 : page)}>
          <KeyboardArrowRight/>
        </IconButton>
      </FlexBox>
    </FlexBox>
  );
};