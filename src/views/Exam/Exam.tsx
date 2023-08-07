import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSubjectData } from 'hooks/useSubjectData/useSubjectData';
import { Question as QuestionType } from 'validators/subjects';
import { Question } from 'views/SubjectAllQuestions/Question/Question';
import { Header } from 'components/Header/Header';
import { Helmet } from 'react-helmet';
import { AnalyticsContext } from 'components/AnalyticsContext/AnalyticsContext';
import { useLearntQuestions } from 'hooks/useLearntQuestions/useLearntQuestions';
import { BreadCrumbs } from 'components/BreadCrumbs/BreadCrumbs';
import { cn } from 'utils';
import { Button } from 'components/ui/button';
import { Cog } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { Skeleton } from 'components/ui/skeleton';
import { QuestionSkeleton } from 'views/SubjectAllQuestions/Question/QuestionSkeleton';
import {
  countTrue,
  formatForPercentage,
  getAlertClasses,
  getAlertIcon,
  getDefaultUserAnswers,
  getObjectValue,
  getRandomQuestions,
  parseSearch,
  scrollToTop,
} from './Exam.utils';

export const Exam = () => {
  const piwik = useContext(AnalyticsContext);
  const location = useLocation();
  const {
    questionsCount = 10,
    successThreshold,
    filterOutLearnt,
  } = parseSearch(location.search);

  const { subjectId } = useParams<{ subjectId: string }>();
  const subjectData = useSubjectData(subjectId);
  const { setQuestion, questions: learntQuestions } =
    useLearntQuestions(subjectId);
  const onLearntChange = useCallback(
    (questionId: string, checked: boolean) =>
      setQuestion(questionId, checked ? 'add' : 'remove'),
    [setQuestion],
  );

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [completed, setCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, boolean[]>>({});

  const onReset = useCallback(() => {
    if (subjectData.state !== 'done') {
      return;
    }

    const newQuestions = getRandomQuestions(
      subjectData.data.data,
      questionsCount,
      filterOutLearnt ? learntQuestions : undefined,
    );
    setQuestions(newQuestions);
    setUserAnswers(getDefaultUserAnswers(newQuestions));
    setCompleted(false);
    scrollToTop();
  }, [questionsCount, subjectData, learntQuestions, filterOutLearnt]);

  useEffect(() => {
    onReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsCount, subjectData, filterOutLearnt]);

  const onSubmit = () => {
    setCompleted(true);
    scrollToTop();
  };

  const onAnswerPick = (
    questionId: string,
    answerIndex: number,
    answerValue: boolean,
  ) => {
    const previousAnswer = getObjectValue(userAnswers, questionId);

    if (previousAnswer === undefined) {
      const question = questions.find(({ id }) => questionId === id);
      const answers = question?.answers ?? [];
      const booleanAnswers = answers.map((_, i) =>
        i === answerIndex ? answerValue : false,
      );

      setUserAnswers({ ...userAnswers, [questionId]: booleanAnswers });
      return;
    }

    const newBooleanAnswers = previousAnswer.map((oldValue, i) =>
      i === answerIndex ? answerValue : oldValue,
    );

    setUserAnswers({ ...userAnswers, [questionId]: newBooleanAnswers });
  };

  const questionsOutcomes = useMemo(() => {
    if (!completed) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(userAnswers).map(
        ([questionId, currentQuestionUserAnswers]) => {
          const question = questions.find(({ id }) => questionId === id);
          const answers = question?.answers ?? [];
          const answersValues = answers.map(({ correct }) => correct);

          const areAllCorrect = answersValues.every(
            (value, i) => value === (currentQuestionUserAnswers[i] ?? false),
          );

          return [questionId, areAllCorrect] as const;
        },
      ),
    );
  }, [completed, questions, userAnswers]);

  const correctQuestions = countTrue(Object.values(questionsOutcomes));
  const percentage =
    questions.length === 0 ? 0 : correctQuestions / questions.length;

  useEffect(() => {
    if (completed) {
      piwik?.push(['trackEvent', 'Exam', 'Submit exam', 'Result', percentage]);
    }
  }, [completed, percentage, piwik]);

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
                content: <Skeleton className="h-5 w-[250px]" />,
                id: 'subjectId',
                to: `/${subjectId}`,
              },
              {
                content: 'Test',
              },
            ]}
          />
        </Header>
        <div className="flex flex-col gap-4">
          <QuestionSkeleton />
          <QuestionSkeleton />
          <QuestionSkeleton />
        </div>
      </>
    );
  }

  const AlertIcon = getAlertIcon(percentage, successThreshold);
  return (
    <>
      <Header>
        <BreadCrumbs
          crumbs={[
            {
              content: 'Generatory 3.0',
              to: '/',
            },
            {
              content: subjectData.data.title,
              to: `/${subjectId}`,
            },
            {
              content: 'Test',
            },
          ]}
        />
      </Header>
      <div className="flex flex-col gap-4">
        {completed && (
          <div
            className={cn(
              'w-full rounded-lg border px-4 py-4 flex gap-3 items-center',
              getAlertClasses(percentage, successThreshold),
            )}
          >
            <AlertIcon className="h-5 w-5" />
            <div className="text-xl font-medium leading-none tracking-tight">
              Twój wynik: {correctQuestions} / {questions.length} (
              {formatForPercentage(percentage)}%)
            </div>
          </div>
        )}
        {questions.map((question) => (
          <Question
            onLearntChange={onLearntChange}
            isLearnt={learntQuestions.has(question.id)}
            subjectId={subjectId}
            question={question}
            key={question.id}
            showUserSelect
            disableUserSelect={completed}
            showCorrect={completed}
            userAnswer={userAnswers[question.id]}
            onAnswerPick={onAnswerPick}
            wasUserSelectCorrect={questionsOutcomes[question.id]}
            hideEdit={!completed}
          />
        ))}
        {!completed ? (
          <div className="flex justify-center">
            <Button variant="blue" onClick={onSubmit} className="min-w-[256px]">
              Sprawdź
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-2">
            <Button variant="blue" onClick={onReset}>
              Wygeneruj nowy test
            </Button>
            <Tooltip>
              <TooltipContent>Zmień parametry testu</TooltipContent>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onReset} asChild>
                  <Link
                    to={{
                      pathname: `/${subjectId}`,
                      state: { testSettings: true },
                    }}
                  >
                    <Cog className="w-4 h-4" />
                    <span className="sr-only">Zmień parametry testu</span>
                  </Link>
                </Button>
              </TooltipTrigger>
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};
