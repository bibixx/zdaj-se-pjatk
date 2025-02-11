import { Routes as ReactRouterRoutes } from 'react-router-dom';
import * as Sentry from '@sentry/react';

export const Routes = Sentry.withSentryReactRouterV7Routing(ReactRouterRoutes);
