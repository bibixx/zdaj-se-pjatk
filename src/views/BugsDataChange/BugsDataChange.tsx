import Link from '@material-ui/core/Link/Link';
import Typography from '@material-ui/core/Typography/Typography';
import { Header } from 'components/Header/Header';
import { TextPageWrapper } from 'components/TextPageWrapper/TextPageWrapper';

export const BugsDataChange = () => (
  <TextPageWrapper>
    <Header backButton>Błędy / Zmiany w danych</Header>
    <h2>Błędy</h2>
    <Typography variant="body1">
      Jeśli znalazłeś/znalazłaś jakiś błąd, zgłoś go za pomocą{' '}
      <Link href="https://github.com/bibixx/zdaj-se-pjatk/issues/new">
        Issue na GitHubie
      </Link>{' '}
      lub skontaktuj się ze mną mailowo na adres{' '}
      <Link href="mailto:zdaj@zdaj.se">zdaj@zdaj.se</Link>.
    </Typography>
    <h2>Zmiana lub dodanie pytań</h2>
    <Typography variant="body1">
      Jeśli chcesz dodać nowe pytania do bazy wejdź na{' '}
      <Link href="https://github.com/bibixx/zdaj-se-pjatk-data">
        https://github.com/bibixx/zdaj-se-pjatk-data
      </Link>
      , zedytuj plik JSON z odpowiednim id przedmiotu, a następnie stwórz Pull
      Requesta.
    </Typography>
    <Typography variant="body1">
      W razie problemów lub pytań skontaktuj się ze mną mailowo na adres{' '}
      <Link href="mailto:zdaj@zdaj.se">zdaj@zdaj.se</Link>.
    </Typography>
  </TextPageWrapper>
);
