import { ColumnFlexBox, FlexBoxFullWidth } from '../common/boxes';
import { useCallback, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { MAIN_LINKS } from './types';
import MainLink from './MainLink';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpandIcon from '../common/ExpandIcon';
import { sidebarSetup } from './sidebarSetup';
import scalefocusImgPath from '../../assets/scalefocus-logo.png';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { pathname } = useLocation();
  const expandHandler = useCallback(() => setExpanded(prev => !prev), []);
  return (
    <ColumnFlexBox borderRight={2} borderColor={theme.palette.grey.A100} justifyContent={'space-between'}
                   sx={{ overflowX: 'hidden' }} minHeight={'100vh'} minWidth={expanded ? 140 : 40}>
      <FlexBoxFullWidth px={1} justifyContent={'center'} sx={{ '&: hover': { cursor: 'pointer' } }}
                        onClick={() => navigate('/intro')}
      >
        <Box width={expanded ? 40 : 30}
             height={50}
             sx={{
               background: `url("${scalefocusImgPath}")`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'contain',
               backgroundPosition: 'center',
             }}
        >
        </Box>
      </FlexBoxFullWidth>

      <FlexBoxFullWidth justifyContent={'flex-end'} mb={2}>
        <ExpandIcon onClick={expandHandler} expanded={expanded} downDirection={false}/>
      </FlexBoxFullWidth>

      {
        Object.values(MAIN_LINKS).map((name) => {
            const option = sidebarSetup[name];
            return (
              <Box key={name}>
                <MainLink
                  expanded={expanded}
                  name={name}
                  path={option.getPath()}
                  icon={option.icon || ''}
                  isWithActiveChild={pathname.startsWith(option.getPath())}
                  isActive={pathname.endsWith(option.getPath())}
                />
              </Box>
            );
          }
        )
      }
      <Box flexGrow={1}/>
    </ColumnFlexBox>
  );
};

export default Sidebar;