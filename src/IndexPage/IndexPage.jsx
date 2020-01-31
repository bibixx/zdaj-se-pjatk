import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CircularProgress, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

import ContentWrapper from '../ContentWrapper';
import Header from '../Header';

const IndexPage = () => {
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('/data/index.json').then((res) => res.json());

        setPages(data);
        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.errors(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header>Generatory 3.0</Header>
      <ContentWrapper>
        <List disablePadding>
          {pages.pages.map(({ title, id }, i) => (
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
      </ContentWrapper>
    </>
  );
};

export default IndexPage;
