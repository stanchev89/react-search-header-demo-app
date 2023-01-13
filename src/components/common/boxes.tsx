import { Box, BoxProps, styled } from '@mui/material';

export const FlexBox = styled(Box)`
  display: flex;
`;

export const ColumnFlexBox = styled(FlexBox)`
  flex-direction: column;
`;

export const BoxFullWidth = styled(Box)`
  width: 100%;
`;

export const FlexBoxFullWidth = styled(FlexBox)`
  width: 100%;
`;

export const FullWidthColumnFlexbox = styled(FlexBoxFullWidth)`
  flex-direction: column;
`;

interface IHoverBoxProps extends BoxProps {
  withPointer?: boolean;
}

export const BoxHoverCursor = ({ withPointer = true, children, ...props }: IHoverBoxProps) => (
  <Box {...props} sx={{
    ...props.sx,
    '&:hover': {
      cursor: withPointer ? 'pointer' : 'default',
      ...(props?.sx as any)?.['&:hover']
    },
  }}
  >
    {children}
  </Box>
);