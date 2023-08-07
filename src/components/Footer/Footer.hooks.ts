import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

export const DONATE_PATH = '/donate';
export function useDonateButton() {
  const jumpContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === jumpContainerRef.current) {
      jumpContainerRef.current?.classList.remove('-translate-y-2');
    }
  };

  const onClick = () => {
    if (DONATE_PATH === location.pathname) {
      jumpContainerRef.current?.classList.add('-translate-y-2');
    }
  };

  const containerProps = {
    onTransitionEnd,
    ref: jumpContainerRef,
  };

  const buttonProps = {
    onClick,
  };

  return { containerProps, buttonProps };
}
