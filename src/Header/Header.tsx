import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    margin: '1rem 0',
  },
});

interface Props {
  backButton?: boolean;
}

export const Header: React.FC<Props> = ({ children, backButton = false }) => {
  const classes = useStyles();

  return (
    <Typography variant="h5" component="h1" className={classes.text}>
      {backButton && (
        <IconButton aria-label="wróć" color="default" component={Link} to="/">
          <ArrowBack />
        </IconButton>
      )}
      {children}
    </Typography>
  );
};
