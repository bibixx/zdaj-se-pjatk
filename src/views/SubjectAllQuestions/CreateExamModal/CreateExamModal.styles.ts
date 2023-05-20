import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 0,
  borderRadius: 4,
};

export const useStyles = makeStyles({
  learntQuestionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  learntQuestionsCheckbox: {
    margin: '-0.25rem 0 0 -0.25rem',
    '&.MuiCheckbox-root': {
      color: green[700],
    },
  },
});
