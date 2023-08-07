import { Link as RouterLink } from 'react-router-dom';

import { formatDate } from 'utils/formatDate';
import { ModeToggle } from 'components/ModeToggle/ModeToggle';
import { Button } from 'components/ui/button';
import { AnimalEmoji } from 'components/AnimalEmoji/AnimalEmoji';

interface Props {
  updatedAt: number | undefined;
}

export const Footer = ({ updatedAt }: Props) => (
  <footer className="pb-4 pt-10">
    <div className="grid items-center grid-cols-footer">
      <Button asChild size="icon" variant="outline">
        <RouterLink to="/donate" className="text-xl">
          <AnimalEmoji />
        </RouterLink>
      </Button>
      <div className="text-center">
        <p className="text-sm">
          Mirror{' '}
          <a
            href="https://pja.mykhi.org/generatory2.0"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
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
        <RouterLink to="/polityka-cookies">Polityka Cookies</RouterLink>
      </Button>
      <Button asChild variant="ghost" size="sm">
        <RouterLink to="/bledy-zmiany-w-danych">
          Błędy / Zmiany w pytaniach
        </RouterLink>
      </Button>
    </div>
  </footer>
);
