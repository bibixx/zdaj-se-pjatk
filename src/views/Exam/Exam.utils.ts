import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import shuffle from 'shuffle-array';

import { LearntQuestionsSet } from 'hooks/useLearntQuestions/useLearntQuestions';
import { Question } from 'validators/subjects';

export function getObjectValue<T>(object: Record<string, T>, key: string): T | undefined {
  return object[key];
}

export const getRandomQuestions = (
  questions: Question[],
  questionsCount: number,
  learntQuestions?: LearntQuestionsSet,
) => {
  return shuffle(
    learntQuestions !== undefined && learntQuestions.size > 0
      ? questions.filter(({ id }) => !learntQuestions.has(id))
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

  const parseIntWithUndefined = (s: string) => Number.parseInt(s, 10) || undefined;

  const rawN = queryParams.get(examSearchParamsKeys.questionCount);
  const rawSuccess = queryParams.get(examSearchParamsKeys.successThreshold);
  const rawFilterOutLearnt = queryParams.get(examSearchParamsKeys.filterOutLearnt);
  const questionsCount = rawN ? parseIntWithUndefined(rawN) : undefined;
  const successThreshold = rawSuccess ? parseIntWithUndefined(rawSuccess) : undefined;
  const filterOutLearnt = rawFilterOutLearnt === 'true';

  return {
    questionsCount,
    successThreshold,
    filterOutLearnt,
  };
};

export const countTrue = (values: boolean[]) => values.filter(Boolean).length;

export const formatForPercentage = (n: number) => (n * 100).toFixed(2).replace('.', ',');

export const getDefaultUserAnswers = (questions: Question[]) => {
  return Object.fromEntries(questions.map(({ id, answers }) => [id, answers.map(() => false)] as const));
};

export const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const getAlertClasses = (percentage: number, successThreshold: number | undefined) => {
  if (successThreshold === undefined) {
    return 'border-blue-200 bg-blue-100 text-blue-900';
  }

  return percentage * 100 >= successThreshold
    ? 'border-green-200 bg-green-100 text-green-900'
    : 'border-red-200 bg-red-100 text-red-900';
};

export const getAlertIcon = (percentage: number, successThreshold: number | undefined) => {
  if (successThreshold === undefined) {
    return Info;
  }

  return percentage * 100 >= successThreshold ? CheckCircle : AlertCircle;
};
