import { createTheme, Theme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import lightBlue from '@material-ui/core/colors/lightBlue';

export const getTheme = (prefersDarkMode: boolean): Theme =>
  createTheme({
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
    overrides: {
      MuiTooltip: {
        tooltip: prefersDarkMode
          ? {
              backgroundColor: '#f1f2f5',
              color: 'rgba(0, 0, 0, 0.87)',
            }
          : {
              backgroundColor: '#303030',
              color: '#fff',
            },
      },
    },
  });
