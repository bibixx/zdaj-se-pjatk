import { Link as RouterLink } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import UILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

interface Props {
  onBannerClose: (areCookiesAccepted: boolean) => void;
  shouldShowCookieBanner: boolean;
}

export const useStyles = makeStyles((theme) => ({
  snackbar: {
    '& .MuiSnackbarContent-action': {
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        padding: 0,
        width: '100%',
        flexDirection: 'column',
      },
    },
  },
}));

export const CookieNotice = ({
  onBannerClose,
  shouldShowCookieBanner,
}: Props) => {
  const classes = useStyles();

  return (
    <Snackbar
      open={!shouldShowCookieBanner}
      message={
        <>
          Ta strona używa plików cookie w celu prowadzenia danych
          statystycznych. Możesz przeczytać o nich więcej w{' '}
          <UILink component={RouterLink} to="/polityka-cookies">
            Polityce Cookies
          </UILink>
          .
        </>
      }
      className={classes.snackbar}
      action={
        <>
          <Button color="primary" onClick={() => onBannerClose(true)}>
            Pozwól na wszystkie cookies
          </Button>
          <Button color="primary" onClick={() => onBannerClose(false)}>
            Pozwól tylko na Niezbędne cookies
          </Button>
        </>
      }
    />
  );
};
