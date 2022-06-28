import { makeStyles, Theme } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

export const useStyles = makeStyles<Theme>({
  greenCheckboxRoot: {
    color: green[400],
    '&.MuiCheckbox-colorPrimary': {
      color: green[600],
    },
    '&.Mui-disabled': {
      opacity: 0.6,
    },
  },
  redCheckboxRoot: {
    color: red[400],
    '&.MuiCheckbox-colorPrimary': {
      color: red[600],
    },
    '&.Mui-disabled': {
      opacity: 0.6,
    },
  },
});
