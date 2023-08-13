import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Header } from 'components/Header/Header';
import { withPageWrapper } from 'components/PageWrapper/PageWrapper';
import { TypographyH2 } from 'components/ui/typography';

export const BugsDataChange = withPageWrapper(() => (
  <div>
    <div className="pl-0 max-md:pl-2 pr-2 max-md:pr-4">
      <Header>
        <BreadCrumbs
          crumbs={[
            {
              content: <span className="whitespace-nowrap">Generatory 3.1</span>,
              id: 'root',
              to: '/',
            },
            {
              content: 'Błędy / Zmiany w danych',
              className: 'overflow-hidden text-ellipsis whitespace-nowrap',
            },
          ]}
        />
      </Header>
    </div>
    <main className="px-4 md:px-2">
      <TypographyH2 className="mt-0">Błędy</TypographyH2>
      <p>
        Jeśli znalazłeś/znalazłaś jakiś błąd, zgłoś go za pomocą{' '}
        <a href="https://github.com/bibixx/zdaj-se-pjatk/issues/new" className="link">
          Issue na GitHubie
        </a>{' '}
        lub skontaktuj się ze mną mailowo na adres{' '}
        <a href="mailto:zdaj@zdaj.se" className="link">
          zdaj@zdaj.se
        </a>
        .
      </p>
      <TypographyH2>Zmiana lub dodanie pytań</TypographyH2>
      <p>
        Jeśli chcesz dodać nowe pytania do bazy wejdź na{' '}
        <a href="https://github.com/bibixx/zdaj-se-pjatk-data" className="link">
          https://github.com/bibixx/zdaj-se-pjatk-data
        </a>
        , zedytuj plik JSON z odpowiednim id przedmiotu w folderze overrides, a następnie stwórz Pull Requesta.
      </p>
      <p>
        W razie problemów lub pytań skontaktuj się ze mną mailowo na adres{' '}
        <a href="mailto:zdaj@zdaj.se" className="link">
          zdaj@zdaj.se
        </a>
        .
      </p>
    </main>
  </div>
));
