import React, { useState, } from 'react';
import { BaseObj } from '../../../types/baseObj';
import { BoxFullWidth } from '../boxes';
import ListItemWrapper from './ListItemWrapper';

interface IViewportListRenderProps {
  list: Array<BaseObj>,
  ListItemComponent: React.FC<{ item: BaseObj }>
  onClick?: (item: any) => void,
}

// This component renders only elements that are in viewport or in buffer zone
const ViewportListRender = ({ list, ListItemComponent, onClick }: IViewportListRenderProps) => {
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);

  return (
    <BoxFullWidth height={'100%'}>
      {
        list.map((item, index) => (
          <ListItemWrapper key={item.id} elementIndex={index} onClick={() => onClick?.(item)} minHeight={230}
                           setVisibleIndex={setLastVisibleIndex} lastVisibleIndex={lastVisibleIndex}
          >
            <ListItemComponent item={item}/>
          </ListItemWrapper>
        ))
      }
    </BoxFullWidth>
  );
};

export default ViewportListRender;