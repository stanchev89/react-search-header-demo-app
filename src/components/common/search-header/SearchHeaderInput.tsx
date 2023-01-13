import { StandardTextFieldProps, TextField } from '@mui/material';

interface IProps extends StandardTextFieldProps {
  isNumber?: boolean;
}

export const SearchHeaderInput = ({ isNumber, ...props }: IProps) => (
  <TextField
    InputProps={{ inputProps: isNumber ? { min: 0 } : {} }}
    inputProps={{ autocomplete: 'off' }}
    type={isNumber ? 'number' : 'text'}
    SelectProps={{ MenuProps: { sx: { maxHeight: { mobile: 200, tablet: 300 } } } }}
    autoComplete={'off'}
    sx={{
      width: { mobile: '100%', laptop: 'initial' },
      minWidth: 140,
      mx: 1,
      my: 1,
      ...props.sx
    }}
    {...props}
  >
    {props?.children}
  </TextField>
);