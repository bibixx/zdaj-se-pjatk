import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { useSubjectData } from 'hooks/useSubjectData/useSubjectData';
import { useLearntQuestions } from 'hooks/useLearntQuestions/useLearntQuestions';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { polishPlural } from 'utils/polishPlural';
import { Button } from 'components/ui/button';
import { Skeleton } from 'components/ui/skeleton';
import { ClipboardList } from 'lucide-react';
import { Question } from './Question/Question';
import { CreateExamModal } from './CreateExamModal/CreateExamModal';
import { QuestionSkeleton } from './Question/QuestionSkeleton';

const formatQuestionsCountText = (count: number) =>
  polishPlural('pytanie', 'pytania', 'pytań', count);

export const SubjectAllQuestions = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subjectData = useSubjectData(subjectId);
  const { setQuestion, questions: learntQuestions } =
    useLearntQuestions(subjectId);
  const location = useLocation<{ testSettings: boolean } | undefined>();
  const [isExamModalOpen, setIsExamModalOpen] = useState(
    location.state?.testSettings ?? false,
  );

  const onLearntChange = useCallback(
    (questionId: string, checked: boolean) =>
      setQuestion(questionId, checked ? 'add' : 'remove'),
    [setQuestion],
  );

  if (subjectData.state === 'error' && subjectData.is404) {
    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <div className="h-96 flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight transition-colors text-center">
            Ups, wybrany przedmiot nie został znaleziony 🙈
          </h1>
          <div className="flex w-full justify-center">
            <Button asChild variant="outline">
              <Link to="/">Wróć do strony głównej</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (subjectData.state === 'loading' || subjectData.state === 'error') {
    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <Header>
          <BreadCrumbs
            crumbs={[
              {
                content: 'Generatory 3.0',
                to: '/',
              },
              {
                content: <Skeleton className="h-6 w-[400px]" />,
                id: 'subjectId',
              },
            ]}
          />
        </Header>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Button
              variant="default"
              size="lg"
              tabIndex={-1}
              disabled
              className="invisible"
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              Wygeneruj test
            </Button>
            <Skeleton className="w-full h-full absolute top-0 left-0" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <QuestionSkeleton />
          <QuestionSkeleton />
          <QuestionSkeleton />
        </div>
      </>
    );
  }

  const { data, title } = subjectData.data;
  const header = `${title} (${subjectId.toUpperCase()})`;

  if (data.length === 0) {
    return (
      <>
        <Helmet>
          <title>{header} | Generatory 3.0</title>
        </Helmet>
        <div className="h-96 flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight transition-colors text-center">
            Ups, wybrany przedmiot nie ma żadnych pytań 🙈
          </h1>
          <div className="flex w-full justify-center">
            <Button asChild variant="outline">
              <Link to="/">Wróć do strony głównej</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

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
        <div className="flex flex-col gap-4">
          {data.map((question) => (
            <Question
              question={question}
              key={question.id}
              showCorrect
              subjectId={subjectId}
              isLearnt={learntQuestions.has(question.id)}
              onLearntChange={onLearntChange}
            />
          ))}
        </div>
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
