/// <reference types="react-scripts" />

declare module 'piwik-react-router' {
  interface Piwik {
    connectToHistory(
      history: import('history').BrowserHistory,
    ): import('history').History;
    trackError(error: Error, eventName?: string): void;
    push(...args: any[]): void;
  }

  type Opts = {
    url: string;
    siteId: number;
    updateDocumentTitle: boolean;
    injectScript: boolean;
    trackErrors: boolean;
  };

  export default function PiwikReactRouter(opts: Opts): Piwik;
}
