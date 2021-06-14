import React from 'react';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Box, IconButton, Switch } from '@material-ui/core';

interface Props {
  darkModeEnabled: boolean;
  onClick: (isEnabled: boolean) => void;
}

export const DarkModeButton = ({
  darkModeEnabled,
  onClick,
}: Props) => (
  <Box display="flex" alignItems="center">
    <IconButton size="small" onClick={() => onClick(false)}>
      <Brightness7Icon />
    </IconButton>
    <Switch
      checked={darkModeEnabled}
      onChange={() => onClick(!darkModeEnabled)}
      name="checkedB"
      color="primary"
    />
    <IconButton size="small" onClick={() => onClick(true)}>
      <Brightness4Icon />
    </IconButton>
  </Box>
);
