import { useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import { Footer } from 'components/Footer/Footer';
import { CookieNotice } from 'components/CookieNotice/CookieNotice';
import { AnalyticsContext } from 'components/AnalyticsContext/AnalyticsContext';
import { RelCanonical } from 'components/RelCanonical/RelCanonical';
import { ThemeProvider } from 'components/ThemeProvider/ThemeProvider';
import { AnimalEmojiProvider } from 'components/AnimalEmoji/AnimalEmoji';
import { TooltipProvider } from 'components/ui/tooltip';
import { Toaster } from 'components/ui/toaster';
import { ScrollToTop } from 'components/ScrollToTop/ScrollToTop';
import { piwik, useAnalytics } from 'hooks/useAnalytics/useAnalytics';
import { UpdatedAtContext } from 'hooks/useUpdatedAt/useUpdatedAt';
import { Exam } from 'views/Exam/Exam';
import { SubjectAllQuestions } from 'views/SubjectAllQuestions/SubjectAllQuestions';
import { BugsDataChange } from 'views/BugsDataChange/BugsDataChange';
import { DonatePage } from 'views/DonatePage/DonatePage';
import { CookiePolicy } from 'views/CookiePolicy/CookiePolicy';
import { IndexPage } from 'views/IndexPage/IndexPage';

import { history } from './customHistory';

export const App = () => {
  const { areCookiesAccepted, onBannerClose } = useAnalytics();
  const [updatedAt, setUpdatedAt] = useState<number | undefined>();

  return (
    <UpdatedAtContext.Provider value={{ updatedAt, setUpdatedAt }}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <TooltipProvider delayDuration={400}>
          <AnalyticsContext.Provider value={piwik}>
            <Router history={piwik ? piwik.connectToHistory(history) : history}>
              <ScrollToTop>
                <AnimalEmojiProvider>
                  <RelCanonical />
                  <CookieNotice onBannerClose={onBannerClose} areCookiesAccepted={areCookiesAccepted} />
                  <Switch>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/polityka-cookies" exact component={CookiePolicy} />
                    <Route path="/bledy-zmiany-w-danych" exact component={BugsDataChange} />
                    <Route path="/donate" exact component={DonatePage} />
                    <Route path="/:subjectId/exam" component={Exam} />
                    <Route path="/:subjectId" exact component={SubjectAllQuestions} />
                  </Switch>
                  <Footer updatedAt={updatedAt} />
                </AnimalEmojiProvider>
                <Toaster />
              </ScrollToTop>
            </Router>
          </AnalyticsContext.Provider>
        </TooltipProvider>
      </ThemeProvider>
    </UpdatedAtContext.Provider>
  );
};
