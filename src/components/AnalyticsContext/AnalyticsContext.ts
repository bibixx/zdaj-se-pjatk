import { Piwik } from 'piwik-react-router';
import { createContext } from 'react';

export const AnalyticsContext = createContext<Piwik | null>(null);
