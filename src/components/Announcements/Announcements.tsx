import { useCallback, useEffect, useMemo } from 'react';

import { useToast } from 'components/ui/use-toast';
import { Button } from 'components/ui/button';

import { ANNOUNCEMENTS, CLOSED_ANNOUNCEMENTS_KEY } from './Announcements.constants';

export const Announcements = () => {
  const { toast, dismiss } = useToast();
  const closedAnnouncements = useMemo(() => localStorage.getItem(CLOSED_ANNOUNCEMENTS_KEY)?.split(',') ?? [], []);
  const onRememberClosed = useCallback((id: string | undefined, toastId: string | undefined) => {
    dismiss(toastId);
    localStorage.setItem(CLOSED_ANNOUNCEMENTS_KEY, [...closedAnnouncements, id].join(','));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ANNOUNCEMENTS.forEach((announcement, i) => {
      if (announcement.htmlId != null && closedAnnouncements.includes(announcement.htmlId)) {
        return;
      }

      let toastId: string | undefined = undefined;

      setTimeout(() => {
        const result = toast({
          variant: 'default',
          action:
            announcement.htmlId != null ? (
              <Button
                size="xs"
                className="mt-1"
                variant="outlineBlue"
                onClick={() => onRememberClosed(announcement.htmlId, toastId)}
              >
                Nie pokazuj więcej
              </Button>
            ) : undefined,
          ...announcement,
        });

        toastId = result.id;
      }, 100 * i);
    });
  }, [closedAnnouncements, onRememberClosed, toast]);

  return null;
};
