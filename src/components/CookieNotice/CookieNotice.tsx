import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { useToast } from 'components/ui/use-toast';
import { Button } from 'components/ui/button';

interface Props {
  onBannerClose: (areCookiesAccepted: boolean) => void;
  areCookiesAccepted: boolean | undefined;
}

export const CookieNotice = ({ onBannerClose, areCookiesAccepted }: Props) => {
  const { toast } = useToast();
  const wasShownRef = useRef(false);

  useEffect(() => {
    if (areCookiesAccepted == null && !wasShownRef.current) {
      wasShownRef.current = true;

      setTimeout(() => {
        const { dismiss } = toast({
          title: '🍪 Cookies',
          htmlId: 'cookieConsentBanner',
          className: 'md:max-w-none w-auto',
          description: (
            <div className="mr-6">
              Używamy plików cookie w celu prowadzenia danych statystycznych. Możesz przeczytać o nich więcej w{' '}
              <Link className="link" to="/polityka-cookies">
                Polityce Cookies
              </Link>
              .
            </div>
          ),
          hideClose: true,
          duration: Infinity,
          action: (
            <div className="flex gap-2 max-sm:flex-wrap max-sm:mt-2 max-sm:!ml-0">
              <Button
                className="whitespace-nowrap max-sm:w-full"
                variant="blue"
                onClick={() => {
                  onBannerClose(true);
                  dismiss();
                }}
              >
                Pozwól na wszystkie
              </Button>
              <Button
                className="whitespace-nowrap max-sm:w-full"
                variant="outline"
                onClick={() => {
                  onBannerClose(false);
                  dismiss();
                }}
              >
                Pozwól tylko na niezbędne
              </Button>
            </div>
          ),
        });
      }, 50);
    }
  }, [onBannerClose, areCookiesAccepted, toast]);

  return null;
};
