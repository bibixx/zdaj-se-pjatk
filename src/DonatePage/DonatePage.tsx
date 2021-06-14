/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Link from '@material-ui/core/Link';
import { Box, Typography } from '@material-ui/core';
import { donationOptions } from './DonatePage.utils';
import { Header } from '../Header/Header';

export const DonatePage = () => (
  <>
    <Header backButton>Donate</Header>
    <Typography variant="body1">
      Zdaj.se
      {' '}
      <strong>zawsze</strong>
      {' '}
      będzie serwisem darmowym dzięki zastosowanym darmowym technologiom i serwisom:
      <Box component="ul" mb="0.5rem" mt="0.25rem">
        <li>
          Hosting – <Link href="https://vercel.com/">vercel.com</Link>
        </li>
        <li>
          Baza danych – <Link href="https://github.com/bibixx/zdaj-se-pjatk-data">GitHub raw content</Link>
        </li>
        <li>
          Domena – domenę zdaj.se opłacam z własnej kieszeni (39,99 zł/rok),{' '}
          jednak cała platforma dostępna jest też pod adresem{' '}
          <Link href="https://zdaj-se.vercel.app">https://zdaj-se.vercel.app</Link>,{' '}
          który zawsze będzie utrzymywany za darmo.
        </li>
      </Box>
      Jednak jeśli zechcesz mnie wspomóc możesz skorzystać z jednej z następujących metod:
    </Typography>
    <Typography variant="body1" component="div">
      <Box
        component="dl"
        display="grid"
        gridTemplateColumns="auto 1fr"
        gridGap="0.5rem 1rem"
        mt="0.5rem"
      >
        {donationOptions.map(({ label, value, link }) => (
          <React.Fragment key={`${label}-dt`}>
            <dt>
              <strong>{label}</strong>
            </dt>
            <Box component="dd" m="0">
              {link ? (
                <Link href={link} target="_blank" rel="noreferrer">
                  {value}
                </Link>
              ) : value}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Typography>
  </>
);
