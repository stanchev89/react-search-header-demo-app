import { ISearchHeaderInputProps } from '../../../interfaces/searchHeaderProps';
import { fireEvent, render, renderHook } from '@testing-library/react';
import SearchHeader from './SearchHeader';
import { getStateFromInputProps } from '../../../utils/getStateFromInputProps';
import { testIds } from '../../../core/testIds';
import { useState } from 'react';

const selectValues = [0, 1, 2, 3, 4, 5];

const inputProps: ISearchHeaderInputProps[] = [
  {
    name: 'string',
    label: 'String'
  },
  {
    name: 'number',
    label: 'Number',
    isNumber: true,
  },
  {
    name: 'select',
    label: 'Select',
    select: {
      list: selectValues,
      getValue: (v: number) => v,
      getLabel: (v: number) => `The number is ${v}`
    }
  }
];

const useTestState = (initialValue: any) => {
  const [state, setState] = useState(initialValue);
  return { state, setState };
};

const initialState = getStateFromInputProps(inputProps, false);

describe('SearchHeader component', async () => {
  const { result } = renderHook(() => useTestState(initialState));
  const { state, setState } = result.current;


  it('should render SearchHeader component with proper input fields', () => {
    const { getByTestId, getAllByLabelText } = render(
      <SearchHeader initialState={initialState} params={state} setParams={setState} inputProps={inputProps}/>
    );
    expect(getByTestId(testIds.searchHeader)).toBeInTheDocument();
    expect(getAllByLabelText('String')[0]).toBeInTheDocument();
    expect(getAllByLabelText('Number')[0]).toBeInTheDocument();
    expect(getAllByLabelText('Select')[0]).toBeInTheDocument();
  });

  it('should be unable to type string value or negative number into number input field', () => {
    const { container } = render(
      <SearchHeader initialState={initialState} params={state} setParams={setState} inputProps={inputProps}/>
    );
    const numberInput = container.querySelector('input[name="number"]') as HTMLInputElement;
    fireEvent.change(numberInput, { target: { value: 'abc' } });
    expect(numberInput.value).toBe('');
    fireEvent.change(numberInput, { target: { value: '123' } });
    expect(numberInput.value).toBe('123');
    fireEvent.change(numberInput, { target: { value: '-123' } });
    expect(numberInput.value).toBe('123');
  });

  it('select field label should be adequate to selected value', () => {
    const testValue = selectValues[2];
    const { container } = render(
      <SearchHeader initialState={initialState} params={{ select: testValue }} setParams={setState}
                    inputProps={inputProps}/>
    );
    const muiSelectValue = container.querySelector('.MuiSelect-select') as HTMLInputElement;
    expect(muiSelectValue.textContent).toBe(`The number is ${testValue}`);
  });

});