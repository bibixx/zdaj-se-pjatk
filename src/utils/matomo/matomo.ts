import { constructUrl } from '../path';

interface MatomoOptions {
  url: string;
  siteId: number;
  trackDocumentTitle?: boolean;
}

class Matomo {
  constructor(private options: MatomoOptions) {
    this.initialize();
  }

  private initialize() {
    const _paq = window._paq || [];
    window._paq = _paq;

    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    const phpUrl = constructUrl(this.options.url, 'matomo.php', true);
    _paq.push(['setTrackerUrl', phpUrl]);
    _paq.push(['setSiteId', String(this.options.siteId)]);

    const g = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];
    g.async = true;

    const jsUrl = constructUrl(this.options.url, 'matomo.js', true);
    g.src = jsUrl;
    s.parentNode?.insertBefore(g, s);
  }

  public push(...args: unknown[]) {
    const _paq = window._paq || [];
    _paq.push(...args);
  }

  public tracePageChange(newPath: string, oldPath: string | undefined) {
    const currentUrl = constructUrl(window.location.host, newPath, true);
    const oldUrl = oldPath ? constructUrl(window.location.host, oldPath, true) : null;

    if (oldPath === currentUrl) {
      return;
    }

    if (this.options.trackDocumentTitle) {
      this.push(['setDocumentTitle', document.title]);
    }

    if (oldPath) {
      this.push(['setReferrerUrl', oldUrl]);
    }

    const newUrl = constructUrl(window.location.hostname, currentUrl, true);
    this.push(['setCustomUrl', newUrl]);
    this.push(['trackPageView']);
  }
}

export const matomo = new Matomo({
  url: 'analytics.legiec.info',
  siteId: 3,
  trackDocumentTitle: true,
});
