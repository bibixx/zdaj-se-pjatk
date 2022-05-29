import React from 'react';
import { Helmet } from 'react-helmet';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CircularProgress, Divider, Box, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useFetch } from 'hooks/useFetch/useFetch';
import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';

import { ContentWrapper } from 'components/ContentWrapper/ContentWrapper';
import { Header } from 'components/Header/Header';

import { pagesSchema } from 'validators/pages';
import { CommentsNote } from 'components/CommentsNote/CommentsNote';

interface IndexProps {
  setUpdatedAt: (updatedAt: number | undefined) => void;
}

const helmetHead = (
  <Helmet>
    <title>Generatory 3.0</title>
  </Helmet>
);

export const IndexPage = ({ setUpdatedAt }: IndexProps) => {
  const errorHandler = useErrorHandler();

  const { data: pages, loading } = useFetch('index.json', pagesSchema, {
    onComplete: (data) => setUpdatedAt(data.updatedAt),
    onError: errorHandler,
  });

  if (loading) {
    return (
      <>
        {helmetHead}
        <ContentWrapper noHeader>
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
        <CommentsNote />
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
