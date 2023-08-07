import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

interface HeaderProps {
  backButton?: boolean;
  backUrl?: string;
  children: ReactNode;
}

export const Header = ({
  children,
  backButton = false,
  backUrl = '/',
}: HeaderProps) => {
  return (
    <div className="flex items-center my-4">
      {backButton && (
        <IconButton
          aria-label="wróć"
          color="default"
          component={Link}
          to={backUrl}
        >
          <ArrowBack />
        </IconButton>
      )}
      {children}
    </div>
  );
};
