import { Piwik } from 'piwik-react-router';
import React from 'react';

const AnalyticsContext = React.createContext<Piwik | null>(null);

export default AnalyticsContext;
