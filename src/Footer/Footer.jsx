import React from 'react';
import { Box } from '@material-ui/core';

const Footer = ({ children }) => (
  <Box py="1rem" component="footer">{children}</Box>
);

export default Footer;
