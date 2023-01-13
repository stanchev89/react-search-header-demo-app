import { MAIN_LINKS } from './types';
import { BoxHoverCursor, FlexBoxFullWidth } from '../common/boxes';
import { Box, Icon, Tooltip, Typography, useTheme } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISidebarMainLinkProps } from '../../interfaces/sidebar';

const MainLink = ({
                    name,
                    path,
                    icon,
                    isActive,
                    isLocked,
                    expanded,
                    isWithActiveChild
                  }: ISidebarMainLinkProps<MAIN_LINKS>) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const clickHandler = useCallback(() => { if (!isLocked) navigate(path); }, [navigate, path, isLocked]);

  return (
    <BoxHoverCursor
      withPointer={!isLocked}
      borderRight={expanded
        ? isActive ? `5px solid ${theme.palette.primary.main}` : 0
        : isWithActiveChild ? `5px solid ${theme.palette.primary.main}` : 0
      }
      onClick={clickHandler}
      mb={.5}
      sx={{
        background: expanded
          ? isActive ? theme.palette.grey.A100 : theme.palette.background.default
          : isWithActiveChild ? theme.palette.grey.A100 : theme.palette.background.default,
      }}
    >
      <Tooltip title={expanded ? '' : name} placement={'right'}>
        <FlexBoxFullWidth alignItems={'center'} boxSizing={'border-box'} position={'relative'} height={50} pl={1}>
          <Box mr={{ mobile: .5, tablet: 1.5 }}>
            <Icon sx={{ color: isLocked ? theme.palette.text.disabled : theme.palette.primary.main }}>{icon}</Icon>
          </Box>
          {
            expanded &&
            <FlexBoxFullWidth alignItems={'center'}>
              <Box flexGrow={1} pr={1}>
                <Typography
                  variant={'body1'}
                  sx={{ color: isLocked ? theme.palette.text.disabled : theme.palette.text.primary, fontWeight: 200 }}
                >
                  {name}
                </Typography>
              </Box>
              {
                isLocked &&
                <Box pr={{ mobile: .5, tablet: 1 }}>
                  <Icon
                    sx={{
                      color: isLocked ? theme.palette.text.disabled : theme.palette.text.primary,
                      fontSize: { mobile: 14, tablet: 24 }
                    }}
                  >
                    lock
                  </Icon>
                </Box>
              }
            </FlexBoxFullWidth>
          }
        </FlexBoxFullWidth>
      </Tooltip>
    </BoxHoverCursor>
  );
};

export default MainLink;