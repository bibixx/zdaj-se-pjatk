import { Link } from 'react-router-dom';

import { ModeToggle } from 'components/ModeToggle/ModeToggle';
import { Button } from 'components/ui/button';
import { AnimalEmoji } from 'components/AnimalEmoji/AnimalEmoji';

import { DONATE_PATH, useDonateButton } from './Footer.hooks';

export const Footer = () => {
  const { buttonProps, containerProps } = useDonateButton();

  return (
    <footer className="pb-4 pt-4 sm:pt-10 max-md:px-4">
      <div className="flex flex-wrap sm:grid w-full justify-center items-center sm:grid-cols-footer gap-[0.75rem] justify-items-center">
        <div className="text-center w-full sm:w-auto col-start-2 row-start-1">
          <p className="text-sm">
            Mirror{' '}
            <a href="https://pja.mykhi.org/generatory2.0" target="_blank" rel="noreferrer" className="link">
              pja.mykhi.org/generatory2.0
            </a>
          </p>
        </div>

        <div className="transition-transform col-start-1 row-start-1" {...containerProps}>
          <Button asChild size="icon" variant="outline" {...buttonProps}>
            <Link to={DONATE_PATH} className="text-xl">
              <AnimalEmoji />
              <span className="sr-only">Wspomóż</span>
            </Link>
          </Button>
        </div>

        <div className="col-start-3 row-start-1">
          <ModeToggle />
        </div>
      </div>
      <div className="flex justify-center mt-[0.75rem] flex-col sm:flex-row">
        <Button asChild variant="ghost" size="sm">
          <a href="https://github.com/bibixx/zdaj-se-pjatk" target="_blank" rel="noreferrer">
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
