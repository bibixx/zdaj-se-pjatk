import React from 'react';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Box, Switch } from '@material-ui/core';

interface DarkModeButtonProps {
  darkModeEnabled: boolean;
  onClick: () => void;
}

const DarkModeButton: React.FC<DarkModeButtonProps> = ({
  darkModeEnabled,
  onClick,
}) => (
  <Box display="flex" alignItems="center">
    <Brightness7Icon />
    <Switch
      checked={darkModeEnabled}
      onChange={onClick}
      name="checkedB"
      color="primary"
    />
    <Brightness4Icon />
  </Box>
);

export default DarkModeButton;
