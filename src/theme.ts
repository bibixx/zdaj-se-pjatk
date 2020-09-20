import { createMuiTheme, Theme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';

const getTheme = (prefersDarkMode: boolean): Theme =>
  createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      ...(!prefersDarkMode
        ? {
            background: {
              default: '#f1f2f5',
            },
          }
        : {}),
      primary: cyan,
      secondary: lightBlue,
    },
  });

export default getTheme;
