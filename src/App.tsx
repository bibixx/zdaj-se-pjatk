import { Outlet, Route, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';

import { Footer } from 'components/Footer/Footer';
import { CookieNotice } from 'components/CookieNotice/CookieNotice';
import { RelCanonical } from 'components/RelCanonical/RelCanonical';
import { ThemeProvider } from 'components/ThemeProvider/ThemeProvider';
import { AnimalEmojiProvider } from 'components/AnimalEmoji/AnimalEmoji';
import { TooltipProvider } from 'components/ui/tooltip';
import { Toaster } from 'components/ui/toaster';
import { ScrollToTop } from 'components/ScrollToTop/ScrollToTop';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { Announcements } from 'components/Announcements/Announcements';
import { useAnalytics } from 'hooks/useAnalytics/useAnalytics';
import { Debug } from 'utils/sentry/Debug';
import { Routes } from 'utils/sentry/Route';
import { PathLoggerProvider } from 'utils/matomo/usePathLogging';
import { Exam } from 'views/Exam/Exam';
import { SubjectAllQuestions } from 'views/SubjectAllQuestions/SubjectAllQuestions';
import { BugsDataChange } from 'views/BugsDataChange/BugsDataChange';
import { DonatePage } from 'views/DonatePage/DonatePage';
import { CookiePolicy } from 'views/CookiePolicy/CookiePolicy';
import { IndexPage } from 'views/IndexPage/IndexPage';
import { ErrorBoundary } from 'views/ErrorBoundary/ErrorBoundary';

export const App = () => {
  const { areCookiesAccepted, onBannerClose } = useAnalytics();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <TooltipProvider delayDuration={400}>
        <BrowserRouter>
          <SentryErrorBoundary fallback={ErrorBoundary}>
            <PathLoggerProvider>
              <ScrollToTop>
                <AnimalEmojiProvider>
                  <RelCanonical />
                  <Routes>
                    <Route element={<WithFooterLayout />}>
                      <Route path="/donate" element={<DonatePage />} />

                      <Route element={<WithPageWrapperLayout />}>
                        <Route index element={<IndexPage />} />
                        <Route path="/polityka-cookies" element={<CookiePolicy />} />
                        <Route path="/bledy-zmiany-w-danych" element={<BugsDataChange />} />
                        <Route path="/:subjectId/exam" element={<Exam />} />
                        <Route path="/:subjectId" element={<SubjectAllQuestions />} />
                        <Route path="/debug" element={<Debug />} />
                      </Route>
                    </Route>
                  </Routes>
                </AnimalEmojiProvider>
                <Toaster />
                <Announcements />
                <CookieNotice onBannerClose={onBannerClose} areCookiesAccepted={areCookiesAccepted} />
              </ScrollToTop>
            </PathLoggerProvider>
          </SentryErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
};

const WithPageWrapperLayout = () => (
  <PageWrapper>
    <Outlet />
  </PageWrapper>
);

const WithFooterLayout = () => (
  <>
    <Outlet />
    <PageWrapper>
      <Footer />
    </PageWrapper>
  </>
);
