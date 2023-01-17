import { BaseObj } from '../../types/baseObj';
import { FlexBox, FullWidthColumnFlexbox } from './boxes';
import { useTheme } from '@mui/material/styles';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import React, { useCallback } from 'react';

const ListItem = ({ item }: { item: BaseObj }) => {
  const theme = useTheme();
  const copyToClipBoardHandler = useCallback((e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
  }, []);
  return (
    <FullWidthColumnFlexbox borderBottom={1} py={2} px={1} sx={{
      '&:hover': {
        background: theme.palette.grey[100],
        color: theme.palette.primary.main,
        cursor: 'pointer',
      }
    }}>
      {
        Object.keys(item).map((key) => (
          typeof item[key] !== 'object' &&
          <FlexBox key={key + item[key].toString()} alignItems={'center'}>
            <Tooltip title={'Copy'} placement={'left'}>
              <IconButton onClick={(e) => copyToClipBoardHandler(e, item[key].toString())}>
                <ContentCopy sx={{ width: 16 }}/>
              </IconButton>
            </Tooltip>
            <Typography variant={'body1'} letterSpacing={1.3} sx={{wordBreak: 'break-word'}}>
              <b>{key}</b>: {item[key].toString()}
            </Typography>
          </FlexBox>
        ))
      }
    </FullWidthColumnFlexbox>
  );
};

export default ListItem;