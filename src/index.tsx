import { createRoot } from 'react-dom/client';
import { PostHogProvider } from 'posthog-js/react';

import './index.css';
import './mathJax';
import './processShim';

import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <PostHogProvider
    apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
    options={{
      api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      defaults: '2025-05-24',
      capture_exceptions: true,
      debug: import.meta.env.MODE === 'development',
    }}
  >
    <App />
  </PostHogProvider>,
);
