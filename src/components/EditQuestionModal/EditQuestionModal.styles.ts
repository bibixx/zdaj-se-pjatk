import { makeStyles } from '@material-ui/core';

export const modalStyles = {
  position: 'fixed' as 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 0,
  borderRadius: 4,
};

export const useEditQuestionModalResultsStyles = makeStyles({
  result: {
    maxHeight: 800,
    padding: 32,
    overflow: 'auto',
    '& img': {
      display: 'block',
      width: 700,
      marginTop: 4,
    },
    '& ol': {
      paddingLeft: 24,
      margin: 0,
      marginTop: 16,
    },
    '& li': {
      marginBottom: 16,
    },
  },
  outputWrapper: {
    position: 'relative',
    '& pre': {
      overflow: 'hidden',
      background: '#272c34',
      color: '#fff',
      borderRadius: 4,
      marginTop: 4,
      padding: '1em',
      fontSize: '0.9em',
      margin: 0,
      maxHeight: 300,
    },
  },
  copyButtonWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
