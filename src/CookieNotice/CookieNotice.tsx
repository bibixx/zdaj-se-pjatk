import { Link as RouterLink } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import UILink from '@material-ui/core/Link';

interface Props {
  onBannerClose: (areCookiesAccepted: boolean) => void
  shouldShowCookieBanner: boolean
}

const CookieNotice = ({
  onBannerClose,
  shouldShowCookieBanner,
}: Props) => (
  <Snackbar
    open={!shouldShowCookieBanner}
    message={(
      <>
        Ta strona używa plików cookie w celu prowadzenia danych statystycznych.
        <br />
        Możesz przeczytać o nich więcej w
        {' '}
        <UILink component={RouterLink} to="/polityka-prywatnosci">polityce cookies</UILink>
        .
      </>
      )}
    action={(
      <>
        <Button color="primary" onClick={() => onBannerClose(true)}>Zgadzam się</Button>
        <Button color="primary" onClick={() => onBannerClose(false)}>Nie zgadzam się</Button>
      </>
      )}
  />
);

export default CookieNotice;
