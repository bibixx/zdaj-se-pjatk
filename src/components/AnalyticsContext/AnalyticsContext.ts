import { Piwik } from 'piwik-react-router';
import React from 'react';

export const AnalyticsContext = React.createContext<Piwik | null>(null);
