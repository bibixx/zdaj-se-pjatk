import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SubjectAllQuestions from './SubjectAllQuestions';
import IndexPage from './IndexPage';

const useStyles = makeStyles({
  root: {
    maxWidth: '50rem',
    margin: '0 auto 1rem',
  },
});

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => createMuiTheme({
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
      },
    }),
    [prefersDarkMode],
  );

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container classes={{ root: classes.root }}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <IndexPage />
            </Route>
            <Route path="/:subjectId">
              <SubjectAllQuestions />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
