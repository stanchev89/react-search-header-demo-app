import { useCallback, useEffect, useMemo, useState } from 'react';
import { IUseQueryStateProps } from '../interfaces/useQueryStateProps';
import { serializeValue } from '../utils/serializeValue';
import { BaseObj } from '../types/baseObj';
import { useSearchParams } from 'react-router-dom';
import { RequestParams } from '../types/requestParams';

// This hook is used to sync and manage state with query params
// It populates state with query params on mount and after that updates query params when state changes
// It returns { queryParamState, isPrePopulated } where queryParamState is the state - with filtered falsy values and  
// with serialized values based on wildcards and arrays props, and isPrePopulated - a boolean that indicates if 
// the state is already pre-populated with query params

export const useQueryParamState = <T extends RequestParams>({
                                                              state,
                                                              setState,
                                                              parser = {} as any,
                                                              wildcards = [],
                                                              arrays = [],
                                                            }: IUseQueryStateProps<T>): { queryParamState: T, isPrePopulated: boolean } => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prePopulated, setPrePopulated] = useState(false);

  // Init pre-populate query params into the state
  useEffect(() => {
    [...searchParams || []].forEach(([key, val]) => {
      if ((Object.keys(state).includes(key)) && state[key] !== val) {
        setState(prev => ({ ...prev, [key]: parser[key] ? parser[key](val) : getSerializedValue(val, state[key]) }));
      }
    });
    setPrePopulated(true);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const diff = useMemo(() => Object.entries(prePopulated ? state : {}).reduce((acc: BaseObj, [key, val]) => {
    const queryParamVal = searchParams.get(key);
    if ((queryParamVal !== val?.toString()) || (queryParamVal && val === '')) {
      acc[key] = val ? val.toString().trim() : val;
    }
    return acc;
  }, {}), [searchParams, state, prePopulated]);


  const handleChange = useCallback((updates: [string, any][]) => {
    updates.forEach(([key, val]) => ['', null, undefined].includes(val) ? searchParams.delete(key) : searchParams.set(key, val));
    setSearchParams(searchParams, { replace: true });
  }, [setSearchParams, searchParams]);

  useEffect(() => {
    if (Object.entries(diff).length) {
      handleChange(Object.entries(diff));
    }
  }, [diff, handleChange]);

  return useMemo<{ queryParamState: T, isPrePopulated: boolean }>(() => ({
    queryParamState: Object.keys(state).reduce((acc: T, key) => {
      const rawValue = state[key];
      if (!['', null, undefined].includes(rawValue)) {
        const value = wildcards.includes(key) ? state[key] + '%' : state[key];
        acc[key as keyof T] = arrays.includes(key) && typeof value === 'string' 
          ? value.split(',').map((v) => v.trim()) 
          : typeof value === 'string' ? value.trim() : value;
      }
      return acc;
    }, {} as T),
    isPrePopulated: prePopulated
  }), [state, wildcards, arrays, prePopulated]);
};

function getSerializedValue(value: string, stateValue: any) {
  return serializeValue(value, stateValue !== '' ? typeof stateValue : isNaN(+value) ? 'string' : 'number');
}