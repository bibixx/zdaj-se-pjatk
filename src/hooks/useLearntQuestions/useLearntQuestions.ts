import { useCallback, useMemo, useState } from 'react';

import { LearntQuestions } from 'validators/subjects';

import {
  addLearntQuestionToLocalStorage,
  getLearntQuestionsFromLocalStorage,
  getLearntQuestionsLocalStorageKey,
  QuestionId,
  removeLearntQuestionFromLocalStorage,
} from './useLearntQuestions.utils';

export type LearntQuestionsSet = Set<string>;

interface UseLearntQuestions {
  questions: LearntQuestionsSet;
  setQuestion: (questionId: QuestionId, action: 'add' | 'remove') => void;
}

export const useLearntQuestions = (subjectId: string): UseLearntQuestions => {
  const learntQuestionsKey = useMemo(() => getLearntQuestionsLocalStorageKey(subjectId), [subjectId]);

  const [learntQuestions, setLearntQuestions] = useState<LearntQuestions>(
    getLearntQuestionsFromLocalStorage(learntQuestionsKey),
  );

  const addQuestion = useCallback(
    (questionId: QuestionId) => {
      addLearntQuestionToLocalStorage(learntQuestionsKey, questionId);
      setLearntQuestions(getLearntQuestionsFromLocalStorage(learntQuestionsKey));
    },
    [learntQuestionsKey],
  );

  const removeQuestion = useCallback(
    (questionId: QuestionId) => {
      removeLearntQuestionFromLocalStorage(learntQuestionsKey, questionId);
      setLearntQuestions(getLearntQuestionsFromLocalStorage(learntQuestionsKey));
    },
    [learntQuestionsKey],
  );

  const setQuestion = useCallback(
    (questionId: QuestionId, action: 'add' | 'remove') =>
      action === 'add' ? addQuestion(questionId) : removeQuestion(questionId),
    [addQuestion, removeQuestion],
  );

  const questions = useMemo(() => new Set(learntQuestions ?? []), [learntQuestions]);

  return {
    questions,
    setQuestion,
  };
};
