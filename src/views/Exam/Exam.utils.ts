import shuffle from 'shuffle-array';
import { LearntQuestions, Question } from 'validators/subjects';

export function getObjectValue<T>(
  object: Record<string, T>,
  key: string,
): T | undefined {
  return object[key];
}

export const getRandomQuestions = (
  questions: Question[],
  questionsCount: number,
  learntQuestions?: LearntQuestions,
) => {
  return shuffle(
    learntQuestions !== undefined && learntQuestions.length > 0
      ? questions.filter(({ id }) => !learntQuestions.includes(id))
      : questions,
    { copy: true },
  ).slice(0, questionsCount);
};

export const examSearchParamsKeys = {
  questionCount: 'n',
  successThreshold: 'success',
  filterOutLearnt: 'no-learnt',
};

interface QueryParams {
  questionsCount: number | undefined;
  successThreshold: number | undefined;
  filterOutLearnt: boolean;
}

export const parseSearch = (search: string): QueryParams => {
  const queryParams = new URLSearchParams(search);

  const parseIntWithUndefined = (s: string) =>
    Number.parseInt(s, 10) || undefined;

  const rawN = queryParams.get(examSearchParamsKeys.questionCount);
  const rawSuccess = queryParams.get(examSearchParamsKeys.successThreshold);
  const rawFilterOutLearnt = queryParams.get(
    examSearchParamsKeys.filterOutLearnt,
  );
  const questionsCount = rawN ? parseIntWithUndefined(rawN) : undefined;
  const successThreshold = rawSuccess
    ? parseIntWithUndefined(rawSuccess)
    : undefined;
  const filterOutLearnt = rawFilterOutLearnt === 'true';

  return {
    questionsCount,
    successThreshold,
    filterOutLearnt,
  };
};

export const countTrue = (values: boolean[]) => values.filter(Boolean).length;

export const formatForPercentage = (n: number) =>
  (n * 100).toFixed(2).replace('.', ',');

export const getAlertSeverity = (
  percentage: number,
  successThreshold: number | undefined,
) => {
  if (successThreshold === undefined) {
    return 'info';
  }

  return percentage * 100 >= successThreshold ? 'success' : 'error';
};

export const getDefaultUserAnswers = (questions: Question[]) => {
  return Object.fromEntries(
    questions.map(({ id, answers }) => [id, answers.map(() => false)] as const),
  );
};

export const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
