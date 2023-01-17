import React, { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { useIsInViewport } from '../../../hooks/useIsInViewport';
import { BoxFullWidth } from '../boxes';

interface IListItemWrapperProps {
  children: ReactNode,
  elementIndex: number,
  setVisibleIndex: Dispatch<SetStateAction<number>>,
  lastVisibleIndex: number,
  onClick?: () => void,
  minHeight?: number | string
}

const BUFFER_RENDERED_ITEMS = 10;

const ListItemWrapper = ({
                           children,
                           elementIndex,
                           setVisibleIndex,
                           lastVisibleIndex,
                           onClick,
                           minHeight
                         }: IListItemWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIsInViewport(ref);

  const isInBufferZone = useMemo(() =>
      Math.abs(lastVisibleIndex - elementIndex) <= BUFFER_RENDERED_ITEMS,
    [elementIndex, lastVisibleIndex]
  );

  useEffect(() => {
    if (isInViewport) {
      setVisibleIndex(elementIndex);
    }
  }, [isInViewport, setVisibleIndex, elementIndex]);

  return (
    <BoxFullWidth ref={ref} minHeight={minHeight}>
      {
        (isInViewport || isInBufferZone) &&
        <BoxFullWidth onClick={onClick}>
          {children}
        </BoxFullWidth>
      }
    </BoxFullWidth>
  );
};

export default ListItemWrapper;