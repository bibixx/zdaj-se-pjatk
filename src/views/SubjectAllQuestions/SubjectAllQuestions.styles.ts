import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles<Theme>({
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
});
