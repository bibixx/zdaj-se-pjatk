import { useMemo, useState, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { IndexPage } from 'views/IndexPage/IndexPage';
import { CookiePolicy } from 'views/CookiePolicy/CookiePolicy';
import { DonatePage } from 'views/DonatePage/DonatePage';
import { BugsDataChange } from 'views/BugsDataChange/BugsDataChange';
import { SubjectAllQuestions } from 'views/SubjectAllQuestions/SubjectAllQuestions';
import { Exam } from 'views/Exam/Exam';

import { piwik, useAnalytics } from 'hooks/useAnalytics/useAnalytics';

import { Footer } from 'components/Footer/Footer';
import { CookieNotice } from 'components/CookieNotice/CookieNotice';
import { AnalyticsContext } from 'components/AnalyticsContext/AnalyticsContext';
import { RelCanonical } from 'components/RelCanonical/RelCanonical';
import { UpdatedAtContext } from 'hooks/useUpdatedAt/useUpdatedAt';

import { EditQuestionModal } from 'components/EditQuestionModal/EditQuestionModal';
import { EditQuestionModalProvider } from 'components/EditQuestionModal/EditQuestionModal.context';
import { getTheme } from './theme';
import { history } from './customHistory';

const useStyles = makeStyles({
  root: {
    maxWidth: '50rem',
    margin: '0 auto 1rem',
  },
});

export const App = () => {
  const { shouldShowCookieBanner, onBannerClose } = useAnalytics();
  const [updatedAt, setUpdatedAt] = useState<number | undefined>();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkModeEnabled, setDarkModeEnabled] = useState(prefersDarkMode);

  useEffect(() => {
    setDarkModeEnabled(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = useMemo(() => getTheme(darkModeEnabled), [darkModeEnabled]);

  const classes = useStyles();

  return (
    <UpdatedAtContext.Provider value={{ updatedAt, setUpdatedAt }}>
      <ThemeProvider theme={theme}>
        <EditQuestionModalProvider>
          <SnackbarProvider maxSnack={1}>
            <AnalyticsContext.Provider value={piwik}>
              <CssBaseline />
              <Container classes={{ root: classes.root }} fixed>
                <Router
                  history={piwik ? piwik.connectToHistory(history) : history}
                >
                  <RelCanonical />
                  <CookieNotice
                    onBannerClose={onBannerClose}
                    shouldShowCookieBanner={shouldShowCookieBanner}
                  />
                  <Switch>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/donate" exact component={DonatePage} />
                    <Route
                      path="/polityka-cookies"
                      exact
                      component={CookiePolicy}
                    />
                    <Route
                      path="/bledy-zmiany-w-danych"
                      exact
                      component={BugsDataChange}
                    />
                    <Route path="/:subjectId/exam" component={Exam} />
                    <Route
                      path="/:subjectId"
                      exact
                      component={SubjectAllQuestions}
                    />
                  </Switch>
                  <Footer
                    updatedAt={updatedAt}
                    darkModeEnabled={darkModeEnabled}
                    setDarkModeEnabled={setDarkModeEnabled}
                  />
                </Router>
              </Container>
              <EditQuestionModal />
            </AnalyticsContext.Provider>
          </SnackbarProvider>
        </EditQuestionModalProvider>
      </ThemeProvider>
    </UpdatedAtContext.Provider>
  );
};
