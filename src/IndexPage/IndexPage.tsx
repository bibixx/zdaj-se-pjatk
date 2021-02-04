import React from 'react';
import { Helmet } from 'react-helmet';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  CircularProgress, Divider, Box, Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ContentWrapper from '../ContentWrapper';
import Header from '../Header';
import validatePages from '../utils/validatePages';
import useFetch from '../useFetch';

interface IndexProps {
  setUpdatedAt: (updatedAt: number) => void
}

const helmetHead = (
  <Helmet>
    <title>
      Generatory 3.0
    </title>
  </Helmet>
);

const IndexPage = ({ setUpdatedAt }: IndexProps) => {
  const {
    data: pages,
    loading,
  } = useFetch(
    'index.json',
    validatePages,
    {
      onComplete: (data) => setUpdatedAt(data.updatedAt),
      // eslint-disable-next-line no-console
      onError: console.error,
    },
  );

  if (loading) {
    return (
      <>
        {helmetHead}
        <ContentWrapper loading>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </ContentWrapper>
      </>
    );
  }

  return (
    <>
      {helmetHead}
      <Header>Generatory 3.0</Header>
      <ContentWrapper>
        <Paper variant="outlined">
          <List disablePadding>
            {pages?.pages.map(({ title, id }, i) => (
              <React.Fragment key={id}>
                {i > 0 && <Divider />}
                <ListItem
                  role={undefined}
                  dense
                  button
                  component={Link}
                  to={`/${id}`}
                >
                  <ListItemText primary={title} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </ContentWrapper>
    </>
  );
};

export default IndexPage;
