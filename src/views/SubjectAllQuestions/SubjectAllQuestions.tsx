import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';

import {
  Typography,
  CircularProgress,
  Box,
  Button as MUIButton,
} from '@material-ui/core';

import { ContentWrapper } from 'components/ContentWrapper/ContentWrapper';
import { Header } from 'components/Header/Header';

import { useSubjectData } from 'hooks/useSubjectData/useSubjectData';
import { useLearntQuestions } from 'hooks/useLearntQuestions/useLearntQuestions';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { polishPlural } from 'utils/polishPlural';
import { Button } from 'components/ui/button';
import { ClipboardList } from 'lucide-react';
import { Question } from './Question/Question';
import { CreateExamModal } from './CreateExamModal/CreateExamModal';

const formatQuestionsCountText = (count: number) =>
  polishPlural('pytanie', 'pytania', 'pytań', count);

export const SubjectAllQuestions = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subjectData = useSubjectData(subjectId);
  const learntQuestions = useLearntQuestions(subjectId);
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
            <MUIButton
              component={Link}
              to="/"
              variant="contained"
              color="primary"
            >
              Wróć do Strony Głównej
            </MUIButton>
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
      <Header>
        <BreadCrumbs
          crumbs={[
            {
              content: 'Generatory 3.0',
              to: '/',
            },
            {
              id: 'main',
              content: (
                <span>
                  {subjectId.toUpperCase()}
                  <span className="text-muted-foreground font-normal">
                    {' '}
                    &bull;{' '}
                  </span>
                  <span className="text-muted-foreground font-normal">
                    {title}
                  </span>{' '}
                  <span className="text-base text-muted-foreground">
                    ({data.length} {formatQuestionsCountText(data.length)})
                  </span>
                </span>
              ),
            },
          ]}
        />
      </Header>
      <div>
        <div className="flex justify-center mb-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => {
              setIsExamModalOpen(true);
            }}
            className="transition-[background,color,transform] hover:scale-[1.02]"
          >
            <ClipboardList className="mr-3 h-5 w-5" />
            Wygeneruj test
          </Button>
        </div>
        {data.length === 0 && (
          <Typography variant="h5" component="h2" align="center">
            Brak pytań
          </Typography>
        )}
        {data.map((question) => (
          <Question
            learntButtonData={{
              onClick: (checked: boolean) =>
                learntQuestions.setQuestion(
                  question.id,
                  checked ? 'add' : 'remove',
                ),
              checked: learntQuestions.questions.has(question.id),
            }}
            question={question}
            key={question.id}
            showCorrect
            subjectId={subjectId}
          />
        ))}
      </div>
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
