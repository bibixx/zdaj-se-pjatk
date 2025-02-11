import './utils/sentry/main';
import { createRoot } from 'react-dom/client';
import './index.css';
import './mathJax';
import './processShim';

import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
