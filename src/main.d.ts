declare module 'piwik-react-router' {
  interface Piwik {
    connectToHistory(history: import('history').BrowserHistory): import('history').History;
    trackError(error: Error | null, eventName?: string): void;
    push(...args: unknown[]): void;
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

interface Window {
  MathJax: {
    typesetPromise: () => Promise<undefined>;
    typeset: () => void;
    tex?: {
      inlineMath?: [string, string][];
    };
  };
}

declare module 'mathjax/es5/tex-mml-chtml.js';
