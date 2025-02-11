import { ReactNode } from 'react';

import { cn } from 'utils';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return <div className={cn('max-w-3xl mx-auto font-normal', className)}>{children}</div>;
};
