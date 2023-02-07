import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Typography, CircularProgress, Box, Button } from '@material-ui/core';

import { ContentWrapper } from 'components/ContentWrapper/ContentWrapper';
import { Header } from 'components/Header/Header';

import { useSubjectData } from 'hooks/useSubjectData/useSubjectData';
import { Question } from './Question/Question';
import { CreateExamModal } from './CreateExamModal/CreateExamModal';

export const SubjectAllQuestions = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subjectData = useSubjectData(subjectId);
  const location = useLocation<{ testSettings: boolean } | undefined>();
  const [isExamModalOpen, setIsExamModalOpen] = useState(
    location.state?.testSettings ?? false,
  );

  if (subjectData.state === 'error' && subjectData.is404) {
    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <ContentWrapper noHeader>
          <Typography variant="h4" component="h1" align="center">
            Przedmiot nie został znaleziony
          </Typography>
          <Box display="flex" width="100%" justifyContent="center">
            <Button component={Link} to="/" variant="contained" color="primary">
              Wróć do Strony Głównej
            </Button>
          </Box>
        </ContentWrapper>
      </>
    );
  }

  if (subjectData.state === 'loading' || subjectData.state === 'error') {
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

  const { data, title } = subjectData.data;
  const header = `${title} (${subjectId.toUpperCase()})`;

  return (
    <>
      <Helmet>
        <title>{header} | Generatory 3.0</title>
      </Helmet>
      <Header backButton>{header}</Header>
      <ContentWrapper>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={() => {
              setIsExamModalOpen(true);
            }}
          >
            Wygeneruj test
          </Button>
        </Box>
        {data.length === 0 && (
          <Typography variant="h5" component="h2" align="center">
            Brak pytań
          </Typography>
        )}
        {data.map((question) => (
          <Question
            question={question}
            key={question.id}
            showCorrect
            subjectId={subjectId}
          />
        ))}
      </ContentWrapper>
      <CreateExamModal
        isOpen={isExamModalOpen}
        onClose={() => {
          setIsExamModalOpen(false);
        }}
        subjectId={subjectId}
      />
    </>
  );
};
