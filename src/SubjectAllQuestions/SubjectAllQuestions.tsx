import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {
  Typography, Divider, CircularProgress, Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContentWrapper from '../ContentWrapper';
import Header from '../Header';
import Comments from '../Comments';

import validateSubject from '../utils/validateSubject';
import useFetch from '../hooks/useFetch';

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
  question: {
    wordBreak: 'break-word',
    '& p': {
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '& img': {
      background: '#fff',
    },
  },
});

interface SubjectAllQuestionsProps {
  setUpdatedAt: (updatedAt: number) => void
}

const SubjectAllQuestions = ({ setUpdatedAt }: SubjectAllQuestionsProps) => {
  const classes = useStyles();
  const { subjectId } = useParams<{ subjectId: string }>();

  const {
    data: subject,
    loading,
  } = useFetch(
    `${subjectId}.json`,
    validateSubject,
    {
      onComplete: (data) => setUpdatedAt(data.updatedAt),
      // eslint-disable-next-line no-console
      onError: console.error,
    },
  );

  if (loading || subject === null) {
    return (
      <>
        <Helmet>
          <title>
            {subjectId}
            {' '}
            |
            Generatory 3.0
          </title>
        </Helmet>
        <ContentWrapper loading>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </ContentWrapper>
      </>
    );
  }

  const { data } = subject;
  const header = subject.title;

  return (
    <>
      <Helmet>
        <title>
          {header}
          {' '}
          |
          Generatory 3.0
        </title>
      </Helmet>
      <Header backButton>{header}</Header>
      <ContentWrapper>
        {data.length === 0 && (
          <Typography variant="h5" component="h2" align="center">
            Brak pytań
          </Typography>
        )}
        {data.map(({
          question, answers, comments, id,
        }) => (
          <Paper variant="outlined" key={`${id}`}>
            <header className={classes.questionHeader}>
              <Typography variant="h5" component="h2" className={classes.question}>
                {/* eslint-disable-next-line react/no-danger */}
                <span dangerouslySetInnerHTML={{ __html: question.trim().replace(/ - \(\d+\)/, '') }} />
              </Typography>
            </header>
            <List disablePadding>
              {answers.map(({ answer, correct }, i) => {
                const labelId = `checkbox-list-label-${answer}`;

                return (
                // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={`${answer}-${i}`}>
                    <Divider />
                    <ListItem
                      role={undefined}
                      dense
                    >
                      <ListItemText
                        id={labelId}
                        primary={(
                          <Box fontWeight="fontWeightBold">
                            <span
                              className={classes.question}
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: answer }}
                            />
                          </Box>
                        )}
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
