import React from 'react';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { IconButton } from '@material-ui/core';

const DarkModeButton = ({ darkModeEnabled, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <IconButton {...props}>
    {
      darkModeEnabled
        ? <Brightness7Icon />
        : <Brightness4Icon />
    }
  </IconButton>
);

export default DarkModeButton;
