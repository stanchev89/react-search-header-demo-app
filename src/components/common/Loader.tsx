import { CircularProgress, Box, BoxProps } from '@mui/material';

interface ILoaderProps extends BoxProps {
  loaderColor?: 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

export const Loader = ({ width, loaderColor, ...props}: ILoaderProps) =>
  <Box position={'absolute'}
       sx={{ 
         transform: 'translate(-50%,-50%)',
         top: '50%',
         left: '50%',
         zIndex: 9999,
         width: width || '100%',
         maxWidth: 200,
         ...props.sx
  }}
       {...props}
  >
    <CircularProgress size={'100%'} color={loaderColor}/>
  </Box>;