import { Link } from 'react-router-dom';

import { formatDate } from 'utils/formatDate';
import { ModeToggle } from 'components/ModeToggle/ModeToggle';
import { Button } from 'components/ui/button';
import { AnimalEmoji } from 'components/AnimalEmoji/AnimalEmoji';
import { DONATE_PATH, useDonateButton } from './Footer.hooks';

interface Props {
  updatedAt: number | undefined;
}

export const Footer = ({ updatedAt }: Props) => {
  const { buttonProps, containerProps } = useDonateButton();

  return (
    <footer className="pb-4 pt-10">
      <div className="grid items-center grid-cols-footer">
        <div className="transition-transform" {...containerProps}>
          <Button asChild size="icon" variant="outline" {...buttonProps}>
            <Link to={DONATE_PATH} className="text-xl">
              <AnimalEmoji />
              <span className="sr-only">Wspomóż</span>
            </Link>
          </Button>
        </div>
        <div className="text-center">
          <p className="text-sm">
            Mirror{' '}
            <a
              href="https://pja.mykhi.org/generatory2.0"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              pja.mykhi.org/generatory2.0
            </a>
          </p>
          {updatedAt !== undefined && (
            <p className="text-xs text-muted-foreground">
              (Stan na{' '}
              <a
                href="https://github.com/bibixx/zdaj-se-pjatk-data"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                {formatDate(new Date(updatedAt))}
              </a>
              )
            </p>
          )}
        </div>

        <ModeToggle />
      </div>
      <div className="flex justify-center mt-[0.75rem]">
        <Button asChild variant="ghost" size="sm">
          <a
            href="https://github.com/bibixx/zdaj-se-pjatk"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to="/polityka-cookies">Polityka Cookies</Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to="/bledy-zmiany-w-danych">Błędy / Zmiany w pytaniach</Link>
        </Button>
      </div>
    </footer>
  );
};
