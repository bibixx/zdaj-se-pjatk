window.MathJax = {
  ...window.MathJax,
  tex: {
    ...window.MathJax?.tex,
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
  },
};

import('mathjax/es5/tex-mml-chtml.js');
