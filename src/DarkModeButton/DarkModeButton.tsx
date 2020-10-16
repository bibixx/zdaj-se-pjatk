import React from 'react';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { IconButton } from '@material-ui/core';

interface DarkModeButtonProps {
  darkModeEnabled: boolean;
  onClick: () => void;
}

const DarkModeButton: React.FC<DarkModeButtonProps> = ({
  darkModeEnabled,
  onClick,
}) => (
  <IconButton onClick={onClick}>
    {darkModeEnabled ? <Brightness7Icon /> : <Brightness4Icon />}
  </IconButton>
);

export default DarkModeButton;
