import { FullWidthColumnFlexbox, FlexBoxFullWidth } from '../boxes';
import { Box, IconButton, MenuItem, Tooltip, useTheme } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import { Backspace, FilterList } from '@mui/icons-material';
import { ISearchHeaderProps } from '../../../interfaces/searchHeaderProps';
import { BaseObj } from '../../../types/baseObj';
import { SearchHeaderInput } from './SearchHeaderInput';
import { testIds } from '../../../core/testIds';

const DEFAULT_DEBOUNCE_DELAY = 700; // In milliseconds

const SearchHeader = ({
                        params,
                        setParams,
                        inputProps,
                        initialState,
                        initialExpanded = true,
                      }: ISearchHeaderProps) => {
  const theme = useTheme();
  const [debounceValues, setDebounceValues] = useState(params);
  const [expanded, setExpanded] = useState(initialExpanded);

  const toggleExpand = useCallback(() => setExpanded(prev => !prev), []);

  const debounceHandler = useDebounceCallback({
    delay: DEFAULT_DEBOUNCE_DELAY,
    callback: (change: BaseObj) => setParams((prev: BaseObj) => ({ ...prev, _page: 1, ...change })),
  });

  const clearFilters = useCallback(() => {
    setDebounceValues(initialState);
    setParams(initialState);
  }, [setParams, initialState]);

  const handleDebounceInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDebounceValues((prev: BaseObj) => ({ ...prev, [name]: value }));
    debounceHandler({ [name]: value });
  }, [setDebounceValues, debounceHandler]);

  const handleDebounceNumberInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = e.target;
    const parsedVal = isNaN(valueAsNumber) ? '' : valueAsNumber;
    if (parsedVal && parsedVal < 0) {return; }
    setDebounceValues((prev: BaseObj) => ({ ...prev, [name]: parsedVal }));
    debounceHandler({ [name]: parsedVal });
  }, [setDebounceValues, debounceHandler]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev: BaseObj) => ({ ...prev, [name]: value }));
  }, [setParams]);
  
  return (
    <FullWidthColumnFlexbox position={'relative'} alignItems={'flex-start'} p={2} pb={expanded ? 6 : 2}
                            boxShadow={expanded ? theme.shadows[2] : 'none'} borderRadius={theme.shape.borderRadius}
    >
      <span data-testid={testIds.searchHeader}></span>
      <FlexBoxFullWidth justifyContent={'space-between'}>
        <Box>
          <Tooltip title={'Filters'} placement={'right'}>
            <IconButton onClick={toggleExpand} sx={{ boxShadow: expanded ? 'none' : theme.shadows[3] }}>
              <FilterList color={'primary'} sx={{ fontSize: 32 }}/>
            </IconButton>
          </Tooltip>
        </Box>
        {
          expanded &&
          <Box>
            <Tooltip title={'Clear Filters'}>
              <IconButton onClick={clearFilters}>
                <Backspace/>
              </IconButton>
            </Tooltip>
          </Box>
        }
      </FlexBoxFullWidth>
      <FullWidthColumnFlexbox alignItems={'center'} position={'relative'}>

        {
          expanded &&
          <FlexBoxFullWidth
            alignItems={{ mobile: 'flex-start', laptop: 'center' }} position={'relative'}
            borderRadius={theme.shape.borderRadius} flexDirection={{ mobile: 'column', laptop: 'row' }}
          >
            <FlexBoxFullWidth flexWrap={'wrap'}>
              {
                inputProps.map(input => (
                  <SearchHeaderInput
                    key={input.name + input.label} name={input.name} label={input.label} select={!!input.select}
                    aria-label={input.label}
                    onChange={
                      input.select
                        ? handleInputChange
                        : input.isNumber
                          ? handleDebounceNumberInputChange
                          : handleDebounceInputChange
                    }
                    value={input.select
                      ? input.select.list.length ? params[input.name] : ''
                      : debounceValues[input.name] ?? ''
                    }
                    isNumber={input.isNumber}
                  >
                    {
                      !!input.select && input.select.list.map(selectVal => (
                        <MenuItem key={input.name + input.select!.getValue(selectVal)}
                                  value={input.select!.getValue(selectVal)}
                        >
                          {input.select!.getLabel(selectVal)}
                        </MenuItem>
                      ))
                    }
                  </SearchHeaderInput>
                ))
              }
            </FlexBoxFullWidth>

          </FlexBoxFullWidth>
        }
      </FullWidthColumnFlexbox>

    </FullWidthColumnFlexbox>
  );
};

export default SearchHeader;

