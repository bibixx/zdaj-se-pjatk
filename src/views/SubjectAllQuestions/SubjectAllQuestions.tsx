import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import { Typography, CircularProgress, Box, Button } from '@material-ui/core';

import { ContentWrapper } from 'components/ContentWrapper/ContentWrapper';
import { Header } from 'components/Header/Header';

import { useFetch } from 'hooks/useFetch/useFetch';
import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { subjectSchema } from 'validators/subjects';

import { useEffect, useState } from 'react';
import { CommentsNote } from 'components/CommentsNote/CommentsNote';
import { FetchError } from 'utils/fetch';
import { getDataWithOverrides } from './SubjectAllQuestions.utils';
import { Question } from './Question/Question';
import { useStyles } from './SubjectAllQuestions.styles';

interface SubjectAllQuestionsProps {
  setUpdatedAt: (updatedAt: number | undefined) => void;
}

export const SubjectAllQuestions = ({
  setUpdatedAt,
}: SubjectAllQuestionsProps) => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [localUpdatedAt, setLocalUpdatedAt] = useState<{
    data: number | undefined;
    override: number | undefined;
  }>({ data: undefined, override: undefined });
  const [is404, setIs404] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (
      localUpdatedAt.data === undefined &&
      localUpdatedAt.override === undefined
    ) {
      return;
    }

    setUpdatedAt(
      Math.max(localUpdatedAt.data ?? 0, localUpdatedAt.override ?? 0),
    );
  }, [localUpdatedAt, setUpdatedAt]);

  const errorHandler = useErrorHandler();

  const { data: subject, loading: subjectLoading } = useFetch(
    `${subjectId}.json`,
    subjectSchema,
    {
      onComplete: (data) =>
        setLocalUpdatedAt((v) => ({ ...v, data: data.updatedAt })),
      onError: (error) => {
        if (error instanceof FetchError && error.status === 404) {
          setIs404(true);
          return;
        }

        errorHandler(error);
      },
    },
  );

  const { data: overrides, loading: overridesLoading } = useFetch(
    `overrides/${subjectId}.json`,
    subjectSchema,
    {
      onComplete: (data) =>
        setLocalUpdatedAt((v) => ({ ...v, override: data.updatedAt })),
    },
  );

  const loading = subjectLoading || overridesLoading;

  if (is404) {
    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <ContentWrapper noHeader>
          <Typography variant="h4" component="h1" align="center">
            Przedmiot nie został znaleziony
          </Typography>
          <div className={classes.buttonWrapper}>
            <Button component={Link} to="/" variant="contained" color="primary">
              Wróć do Strony Głównej
            </Button>
          </div>
        </ContentWrapper>
      </>
    );
  }

  if (loading || subject === null) {
    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <ContentWrapper noHeader>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </ContentWrapper>
      </>
    );
  }

  const { data, title: header } = getDataWithOverrides(subject, overrides);

  return (
    <>
      <Helmet>
        <title>{header} | Generatory 3.0</title>
      </Helmet>
      <Header backButton>{header}</Header>
      <ContentWrapper>
        <CommentsNote />
        {data.length === 0 && (
          <Typography variant="h5" component="h2" align="center">
            Brak pytań
          </Typography>
        )}
        {data.map((question) => (
          <Question question={question} key={question.id} />
        ))}
      </ContentWrapper>
    </>
  );
};
