import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowRight } from '@mui/icons-material';

interface Props extends IconButtonProps {
  expanded?: boolean,
  downDirection?: boolean,
  tooltip?: string
}

const ExpandIcon = ({ expanded, downDirection, tooltip = '', ...props }: Props) => {
  const theme = useTheme();
  return (
    <Tooltip title={tooltip}>
      <IconButton sx={{
        color: theme.palette.primary.dark,
        fontSize: { mobile: 20, laptop: 28 },
        transform: `rotate(${expanded ? '180deg' : ''})`,
        transition: 'all .2s ease-out'
      }} {...props}>
        {
          downDirection
            ? <KeyboardDoubleArrowDown/>
            : <KeyboardDoubleArrowRight/>
        }
      </IconButton>
    </Tooltip>
    
  );
};

export default ExpandIcon;