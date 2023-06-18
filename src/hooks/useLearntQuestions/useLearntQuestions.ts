import { useMemo, useState } from 'react';
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
  const learntQuestionsKey = useMemo(
    () => getLearntQuestionsLocalStorageKey(subjectId),
    [subjectId],
  );

  const [learntQuestions, setLearntQuestions] = useState<LearntQuestions>(
    getLearntQuestionsFromLocalStorage(learntQuestionsKey),
  );

  return useMemo(() => {
    const addQuestion = (questionId: QuestionId) => {
      addLearntQuestionToLocalStorage(learntQuestionsKey, questionId);
      setLearntQuestions(
        getLearntQuestionsFromLocalStorage(learntQuestionsKey),
      );
    };

    const removeQuestion = (questionId: QuestionId) => {
      removeLearntQuestionFromLocalStorage(learntQuestionsKey, questionId);
      setLearntQuestions(
        getLearntQuestionsFromLocalStorage(learntQuestionsKey),
      );
    };

    return {
      questions: new Set(learntQuestions ?? []),
      setQuestion: (questionId: QuestionId, action: 'add' | 'remove') =>
        action === 'add' ? addQuestion(questionId) : removeQuestion(questionId),
    };
  }, [learntQuestions, learntQuestionsKey]);
};
