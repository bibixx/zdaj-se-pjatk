import { ReactNode } from 'react';

import { cn } from 'utils';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  return <div className={cn('flex items-center py-4', className)}>{children}</div>;
};
