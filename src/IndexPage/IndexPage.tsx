import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  CircularProgress, Divider, Box, Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ContentWrapper from '../ContentWrapper';
import Header from '../Header';
import customFetch from '../utils/fetch';
import { Pages } from '../types/pages';
import validatePages from '../utils/validatePages';

interface IndexProps {
  setUpdatedAt: (updatedAt: number) => void
}

const IndexPage = ({ setUpdatedAt }: IndexProps) => {
  const [pages, setPages] = useState<Pages|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customFetch('index.json', validatePages);

        setPages(data);
        setLoading(false);
        setUpdatedAt(data.updatedAt);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchData();
  }, [setUpdatedAt]);

  if (loading) {
    return (
      <ContentWrapper loading>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </ContentWrapper>
    );
  }

  return (
    <>
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
