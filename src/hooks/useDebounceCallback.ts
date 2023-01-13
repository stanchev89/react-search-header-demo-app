import { useEffect, useRef, useState } from 'react';

export interface IDebounceCallbackProps {
  delay: number,
  callback: (val: any) => void,
}

export const useDebounceCallback = ({ delay, callback }: IDebounceCallbackProps) => {
  const [state, setState] = useState(null);
  const timer = useRef<any>(null);
  
  useEffect(() => {
    if(state !== null) {
      if(timer.current) { clearTimeout(timer.current);}
      timer.current = setTimeout(() => {
        callback(state);
      }, delay);
      setState(null);
    }
  }, [callback, delay, state]);
  
  return (val?: any) => setState(val);
};