import { useMemo, useState, useEffect } from 'react';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SubjectAllQuestions from './SubjectAllQuestions/SubjectAllQuestions';
import IndexPage from './IndexPage/IndexPage';
import Footer from './Footer/Footer';
import CookieNotice from './CookieNotice/CookieNotice';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import useAnalytics from './hooks/useAnalytics/useAnalytics';
import AnalyticsContext from './AnalyticsContext/AnalyticsContext';

import getTheme from './theme';
import history from './history';
import { DonatePage } from './DonatePage/DonatePage';

const useStyles = makeStyles({
  root: {
    maxWidth: '50rem',
    margin: '0 auto 1rem',
  },
});

const App = () => {
  const { piwik, shouldShowCookieBanner, onBannerClose } = useAnalytics();
  const [updatedAt, setUpdatedAt] = useState(0);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkModeEnabled, setDarkModeEnabled] = useState(prefersDarkMode);

  useEffect(() => {
    setDarkModeEnabled(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = useMemo(
    () => getTheme(darkModeEnabled),
    [darkModeEnabled],
  );

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={1}>
        <AnalyticsContext.Provider value={piwik}>
          <CssBaseline />
          <Container classes={{ root: classes.root }} fixed>
            <Router history={piwik.connectToHistory(history)}>
              <CookieNotice
                onBannerClose={onBannerClose}
                shouldShowCookieBanner={shouldShowCookieBanner}
              />
              <Switch>
                <Route path="/" exact>
                  <IndexPage setUpdatedAt={setUpdatedAt} />
                </Route>
                <Route path="/polityka-prywatnosci" exact component={PrivacyPolicy} />
                <Route path="/:subjectId">
                  <SubjectAllQuestions setUpdatedAt={setUpdatedAt} />
                </Route>
              </Switch>
              <Footer
                updatedAt={updatedAt}
                darkModeEnabled={darkModeEnabled}
                setDarkModeEnabled={setDarkModeEnabled}
              />
            </Router>
          </Container>
        </AnalyticsContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
