import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Cookies from 'cookies-js';

import { useToast } from 'components/ui/use-toast';
import { getBooleanCookie } from 'utils/cookies';

const CLOSED_KEY = 'donatePromptClosed';

export const useDonatePrompt = () => {
  const { toast } = useToast();
  const [wasPopupShownBefore, setWasPopupShownBefore] = useState(getBooleanCookie(CLOSED_KEY) !== undefined);
  const [isVisible, setIsVisible] = useState(false);

  const onClose = useCallback(() => {
    setIsVisible(false);
    setWasPopupShownBefore(true);

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    Cookies.set(CLOSED_KEY, true, {
      expires: expiryDate,
    });
  }, []);

  useEffect(() => {
    if (isVisible) {
      const { dismiss } = toast({
        title: (
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Część zdjęć nie wczytuje się poprawnie.
          </div>
        ),
        className: 'md:max-w-none w-auto',
        variant: 'warning',
        description: (
          <div className="text-[0.8rem] leading-4">
            <p>Spowodowane jest to zmianami na MYKHI.</p>
            <p>
              Pracuję już nad nową wersją scrapera który pobiera również zdjęcia z pytań. Jeśli chcesz aby prace poszły
              szybciej, rozważ{' '}
              <Link className="link" to="/donate">
                wsparcie.
              </Link>
              .
            </p>
            <p className="italic mt-1">
              <strong>Uwaga:</strong> Nowa wersja scrapera powstanie niezależnie od wsparcia, ale wpłaty na cele z
              pewnością mnie bardziej zmotywują.
            </p>
          </div>
        ),
        duration: Infinity,
        onOpenChange: (open) => {
          if (open === false) {
            onClose();
          }
        },
      });

      return () => {
        onClose();
        dismiss();
      };
    }
  }, [toast, isVisible, onClose]);

  useEffect(() => {
    if (wasPopupShownBefore) {
      return;
    }

    const onError = (event: ErrorEvent) => {
      if (!(event.target instanceof HTMLImageElement)) {
        return;
      }

      const src = new URL(event.target.src);

      if (src.hostname === 'pja.mykhi.org') {
        setIsVisible(true);
      }

      document.body.removeEventListener('error', onError, { capture: true });
    };

    document.body.addEventListener('error', onError, { capture: true });

    return () => document.body.removeEventListener('error', onError, { capture: true });
  }, [toast, wasPopupShownBefore]);
};
