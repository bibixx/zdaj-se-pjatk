import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return <div className="flex items-center py-4">{children}</div>;
};
