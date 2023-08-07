import { Slot } from '@radix-ui/react-slot';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

interface TooltipIfTooWideProps {
  children?: ReactNode;
  tooltip?: ReactNode;
}

export const TooltipIfTooWide = ({ children, tooltip }: TooltipIfTooWideProps) => {
  const outerRef = useRef<HTMLElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (outerRef.current == null) {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (outerRef.current == null) {
        setShowTooltip(false);
        return;
      }

      setShowTooltip(outerRef.current.offsetWidth < outerRef.current.scrollWidth);
    });

    resizeObserver.observe(outerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipContent>{tooltip ?? children}</TooltipContent>
        <TooltipTrigger asChild>
          <Slot ref={outerRef}>{children}</Slot>
        </TooltipTrigger>
      </Tooltip>
    );
  }

  return <Slot ref={outerRef}>{children}</Slot>;
};
