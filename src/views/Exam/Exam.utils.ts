import shuffle from 'shuffle-array';
import { Question } from 'validators/subjects';

export function getObjectValue<T>(
  object: Record<string, T>,
  key: string,
): T | undefined {
  return object[key];
}

export const getRandomQuestions = (
  questions: Question[],
  questionsCount: number,
) => {
  return shuffle(questions, { copy: true }).slice(0, questionsCount);
};

interface QueryParams {
  questionsCount: number | undefined;
  successThreshold: number | undefined;
}

export const parseSearch = (search: string): QueryParams => {
  const queryParams = new URLSearchParams(search);

  const parseIntWithUndefined = (s: string) =>
    Number.parseInt(s, 10) || undefined;

  const rawN = queryParams.get('n');
  const rawSuccess = queryParams.get('success');
  const questionsCount = rawN ? parseIntWithUndefined(rawN) : undefined;
  const successThreshold = rawSuccess
    ? parseIntWithUndefined(rawSuccess)
    : undefined;

  return {
    questionsCount,
    successThreshold,
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
