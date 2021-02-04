/// <reference types="react-scripts" />

declare module 'piwik-react-router' {
  interface Piwik {
    connectToHistory(history: import('history').BrowserHistory): import('history').History
  }

  type Opts = {
    url: string,
    siteId: number
  };

  export default function PiwikReactRouter(opts: Opts): Piwik;
}
