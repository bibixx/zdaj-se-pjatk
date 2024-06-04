import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from 'components/ui/toast';
import { Button } from 'components/ui/button';

interface Props {
  onBannerClose: (areCookiesAccepted: boolean) => void;
  areCookiesAccepted: boolean | undefined;
}

export const CookieNotice = ({ onBannerClose, areCookiesAccepted }: Props) => {
  const [isOpen, setIsOpen] = useState(areCookiesAccepted);
  const dismiss = () => setIsOpen(false);

  return (
    <ToastProvider>
      <Toast key="cookieConsentBanner" id="cookieConsentBanner" open={isOpen} className="md:max-w-none w-auto">
        <div className="grid gap-1">
          <ToastTitle>🍪 Cookies</ToastTitle>
          <ToastDescription>
            <div className="mr-6">
              Używamy plików cookie w celu prowadzenia danych statystycznych. Możesz przeczytać o nich więcej w{' '}
              <Link className="link" to="/polityka-cookies">
                Polityce Cookies
              </Link>
              .
            </div>
          </ToastDescription>
        </div>
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
      </Toast>

      <ToastViewport />
    </ToastProvider>
  );
};
