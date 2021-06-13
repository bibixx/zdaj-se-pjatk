import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import formatDate from '../utils/formatDate';
import DarkModeButton from '../DarkModeButton/DarkModeButton';

interface Props {
  updatedAt: number;
  darkModeEnabled: boolean;
  setDarkModeEnabled: (darkModeEnabled: boolean) => void
}

const Footer = ({
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
        <Link href="https://ko-fi.com/bibixx" target="_blank" rel="noreferrer">
          <strong>Donate</strong>
        </Link>
      </Box>
      <Box textAlign="center">
        <Typography variant="body2">
          Mirror
          {' '}
          <Link href="https://pja.mykhi.org/generatory2.0" target="_blank" rel="noreferrer">
            pja.mykhi.org/generatory2.0
          </Link>
        </Typography>
        <Typography variant="caption">
          {`(Stan na ${formatDate(new Date(updatedAt))})`}
        </Typography>
      </Box>
      <Box justifySelf={['center', 'flex-end']}>
        <DarkModeButton
          darkModeEnabled={darkModeEnabled}
          onClick={(isEnabled) => setDarkModeEnabled(isEnabled)}
        >
          Zmień motyw
        </DarkModeButton>
      </Box>
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      mt="0.5rem"
      style={{ gap: '1rem' }}
    >
      <Link href="https://github.com/bibixx/zdaj-se-pjatk" target="_blank" rel="noreferrer">
        GitHub
      </Link>
      <Link component={RouterLink} to="/polityka-prywatnosci">Polityka cookies</Link>
    </Box>
  </Box>
);

export default Footer;
