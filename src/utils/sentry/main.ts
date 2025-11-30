import { init, reactRouterV7BrowserTracingIntegration } from '@sentry/react';
import { useEffect } from 'react';
import { useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from 'react-router';

init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/zdaj\.se/, /^https:\/\/zdaj-se-pjatk\.bibixx\.workers\.dev/],
  // Session Replay
  integrations: [
    reactRouterV7BrowserTracingIntegration({
      useEffect: useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
});
