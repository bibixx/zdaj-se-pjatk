import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';

const getTheme = (prefersDarkMode: boolean) => createMuiTheme({
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    ...(!prefersDarkMode
      ? {
        background: {
          default: '#f1f2f5',
        },
      }
      : {}
    ),
    primary: red,
    secondary: amber,
  },
});

export default getTheme;
