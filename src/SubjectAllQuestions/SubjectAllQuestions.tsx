import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { Typography, Divider, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContentWrapper from '../ContentWrapper';
import Header from '../Header';
import Comments from '../Comments';

import styles from './SubjectAllQuestions.module.scss';
import customFetch from '../utils/fetch';
import validateSubject from '../utils/validateSubject';
import { Subject } from '../types/subject';

const useStyles = makeStyles({
  root: {
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1.5rem',
  },
  button: {
    textTransform: 'none',
  },
  questionHeader: {
    padding: '1rem',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    height: '2.625rem',
    marginLeft: '0.5rem',
  },
});

const SubjectAllQuestions = (): JSX.Element => {
  const classes = useStyles();
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customFetch(`${subjectId}.json`, validateSubject);

        setSubject(data);
        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchData();
  }, [subjectId]);

  if (loading || subject === null) {
    return (
      <ContentWrapper loading>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </ContentWrapper>
    );
  }

  const { data } = subject;
  const header = subject.title;

  return (
    <>
      <Header backButton>{header}</Header>
      <ContentWrapper>
        {data.length === 0 && (
          <Typography variant="h5" component="h2" align="center">
            Brak pytań
          </Typography>
        )}
        {data.map(({ question, answers, comments, id }) => (
          <Paper variant="outlined" key={`${id}`}>
            <header className={classes.questionHeader}>
              <Typography
                variant="h5"
                component="h2"
                className={styles.question}
              >
                {/* eslint-disable react/no-danger */}
                <span
                  dangerouslySetInnerHTML={{
                    __html: question.trim().replace(/ - \(\d+\)/, ''),
                  }}
                />
                {/* eslint-enable react/no-danger */}
              </Typography>
            </header>
            <List disablePadding>
              {answers.map(({ answer, correct }, i) => {
                const labelId = `checkbox-list-label-${answer}`;

                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={`${answer}-${i}`}>
                    <Divider />
                    <ListItem role={undefined} dense>
                      <ListItemText
                        id={labelId}
                        primary={
                          <Box fontWeight="fontWeightBold">
                            <span
                              className={styles.question}
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: answer }}
                            />
                          </Box>
                        }
                      />
                      <ListItemIcon>
                        <Checkbox
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                          checked={correct}
                          disabled
                        />
                      </ListItemIcon>
                    </ListItem>
                  </React.Fragment>
                );
              })}
              <Comments comments={comments} />
            </List>
          </Paper>
        ))}
      </ContentWrapper>
    </>
  );
};

export default SubjectAllQuestions;
