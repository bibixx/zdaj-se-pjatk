/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { Typography, Divider, CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ContentWrapper } from 'components/ContentWrapper/ContentWrapper';
import { Header } from 'components/Header/Header';
import { Comments } from 'components/Comments/Comments';

import { useFetch } from 'hooks/useFetch/useFetch';
import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { subjectSchema } from 'validators/subjects';

import { getDataWithOverrides } from './SubjectAllQuestions.utils';

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
  setUpdatedAt: (updatedAt: number | undefined) => void;
}

export const SubjectAllQuestions = ({
  setUpdatedAt,
}: SubjectAllQuestionsProps) => {
  const classes = useStyles();
  const { subjectId } = useParams<{ subjectId: string }>();
  const errorHandler = useErrorHandler();

  const { data: subject, loading: subjectLoading } = useFetch(
    `${subjectId}.json`,
    subjectSchema,
    {
      onComplete: (data) => setUpdatedAt(data.updatedAt),
      onError: errorHandler,
    },
  );

  const { data: overrides, loading: overridesLoading } = useFetch(
    `overrides/${subjectId}.json`,
    subjectSchema,
    {
      onComplete: (data) => setUpdatedAt(data.updatedAt),
    },
  );

  const loading = subjectLoading || overridesLoading;

  if (loading || subject === null) {
    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <ContentWrapper loading>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </ContentWrapper>
      </>
    );
  }

  const { data } = getDataWithOverrides(subject, overrides);

  const header = subject.title;

  return (
    <>
      <Helmet>
        <title>{header} | Generatory 3.0</title>
      </Helmet>
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
                className={classes.question}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: question.trim().replace(/ - \(\d+\)/, ''),
                  }}
                />
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
                              className={classes.question}
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
