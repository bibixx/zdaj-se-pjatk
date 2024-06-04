import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Bug, ClipboardList } from 'lucide-react';

import { Header } from 'components/Header/Header';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { Button } from 'components/ui/button';
import { Skeleton } from 'components/ui/skeleton';
import { TooltipIfTooWide } from 'components/TooltipIfTooWide/TooltipIfTooWide';
import { withPageWrapper } from 'components/PageWrapper/PageWrapper';
import { useSubjectData } from 'hooks/useSubjectData/useSubjectData';
import { useLearntQuestions } from 'hooks/useLearntQuestions/useLearntQuestions';
import { useDonatePrompt } from 'hooks/useDonatePrompt/useDonatePrompt';
import { polishPlural } from 'utils/polishPlural';

import { QuestionSkeleton } from './Question/QuestionSkeleton';
import { CreateExamModal } from './CreateExamModal/CreateExamModal';
import { Question } from './Question/Question';

const formatQuestionsCountText = (count: number) => polishPlural('pytanie', 'pytania', 'pytań', count);

export const SubjectAllQuestions = withPageWrapper(() => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subjectData = useSubjectData(subjectId);
  const { setQuestion, questions: learntQuestions } = useLearntQuestions(subjectId);
  const location = useLocation<{ testSettings: boolean } | undefined>();
  const [isExamModalOpen, setIsExamModalOpen] = useState(location.state?.testSettings ?? false);

  const onLearntChange = useCallback(
    (questionId: string, checked: boolean) => setQuestion(questionId, checked ? 'add' : 'remove'),
    [setQuestion],
  );

  useDonatePrompt();

  if (subjectData.state === 'error') {
    if (subjectData.is404) {
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

    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <div className="h-96 flex flex-col justify-center gap-4 px-4">
          <h1 className="text-3xl font-semibold tracking-tight transition-colors text-center">
            Ups, wystąpił nieznany błąd 🙈
          </h1>
          <div className="flex flex-col gap-2 w-full items-center">
            <Button asChild variant="outline">
              <Link to="/">Wróć do strony głównej</Link>
            </Button>
            <Button asChild variant="destructive">
              <a href="https://github.com/bibixx/zdaj-se-pjatk/issues/new" target="_blank" rel="noreferrer">
                <Bug className="w-4 h-4 mr-2" />
                Zgłoś błąd
              </a>
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (subjectData.state === 'loading') {
    return (
      <>
        <Helmet>
          <title>{subjectId} | Generatory 3.0</title>
        </Helmet>
        <div className="pl-0 max-md:pl-2 pr-2 max-md:pr-4">
          <Header>
            <BreadCrumbs
              crumbs={[
                {
                  content: <span className="whitespace-nowrap">Generatory 3.0</span>,
                  id: 'root',
                  to: '/',
                },
                {
                  content: <Skeleton className="h-6 w-[400px]" />,
                  id: 'subjectId',
                  className: 'flex',
                },
              ]}
            />
          </Header>
        </div>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Button variant="default" size="lg" tabIndex={-1} disabled className="invisible">
              <ClipboardList className="mr-3 h-5 w-5" />
              Wygeneruj test
            </Button>
            <Skeleton className="w-full h-full absolute top-0 left-0" />
          </div>
        </div>
        <div className="flex flex-col gap-4 px-2 sm:px-0">
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
      <div className="pl-0 max-md:pl-2 pr-2 max-md:pr-4">
        <Header>
          <BreadCrumbs
            crumbs={[
              {
                content: <span className="whitespace-nowrap">Generatory 3.0</span>,
                id: 'root',
                to: '/',
              },
              {
                id: 'main',
                content: (
                  <div className="flex whitespace-nowrap items-baseline">
                    {subjectId.toUpperCase()}
                    <span className="text-muted-foreground font-normal">&nbsp;&bull;&nbsp;</span>
                    <TooltipIfTooWide tooltip={<span className="font-normal">{title}</span>}>
                      <span className="text-muted-foreground font-normal flex-1 overflow-hidden text-ellipsis">
                        {title}
                      </span>
                    </TooltipIfTooWide>
                    <span className="text-base text-muted-foreground">
                      &nbsp;({data.length} {formatQuestionsCountText(data.length)})
                    </span>
                  </div>
                ),
              },
            ]}
          />
        </Header>
      </div>
      <div className="px-2 sm:px-0">
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
              hasHashLink
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
});
