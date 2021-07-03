import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { formatDate } from '../utils/formatDate';
import { DarkModeButton } from '../DarkModeButton/DarkModeButton';

interface Props {
  updatedAt: number | undefined;
  darkModeEnabled: boolean;
  setDarkModeEnabled: (darkModeEnabled: boolean) => void;
}

export const Footer = ({
  updatedAt,
  darkModeEnabled,
  setDarkModeEnabled,
}: Props) => (
  <Box py="1rem" component="footer">
    <Box
      display="grid"
      gridTemplateColumns={['1fr', 'repeat(3, 1fr)']}
      alignItems="center"
    >
      <Box textAlign={['center', 'left']} mb={['0.25rem', '0']}>
        <Link component={RouterLink} to="/donate">
          <strong>Donate</strong>
        </Link>
      </Box>
      <Box textAlign="center">
        <Typography variant="body2">
          Mirror{' '}
          <Link
            href="https://pja.mykhi.org/generatory2.0"
            target="_blank"
            rel="noreferrer"
          >
            pja.mykhi.org/generatory2.0
          </Link>
        </Typography>
        {updatedAt !== undefined && (
          <Typography variant="caption">
            (Stan na {formatDate(new Date(updatedAt))})
          </Typography>
        )}
      </Box>
      <Box justifySelf={['center', 'flex-end']}>
        <DarkModeButton
          darkModeEnabled={darkModeEnabled}
          onClick={(isEnabled) => setDarkModeEnabled(isEnabled)}
        />
      </Box>
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      mt="0.5rem"
      flexDirection={{ xs: 'column', sm: 'row' }}
      style={{ gap: '1rem' }}
      textAlign="center"
    >
      <Link
        href="https://github.com/bibixx/zdaj-se-pjatk"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </Link>
      <Link component={RouterLink} to="/polityka-cookies">
        Polityka Cookies
      </Link>
      <Link component={RouterLink} to="/bledy-zmiany-w-danych">
        Błędy / Zmiany w pytaniach
      </Link>
    </Box>
  </Box>
);
