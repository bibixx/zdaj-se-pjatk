interface Window {
  MathJax: {
    typesetPromise: () => Promise<undefined>;
    typeset: () => void;
    tex?: {
      inlineMath?: [string, string][];
    };
  };
  _paq?: unknown[];
}

declare module 'mathjax/es5/tex-mml-chtml.js';
