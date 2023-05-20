import { useEffect, useMemo, useState } from 'react';
import { LearntQuestions } from 'validators/subjects';
import { UseSubjectData } from 'hooks/useSubjectData/useSubjectData';
import {
  addLearntQuestionToLocalStorage,
  getLearntQuestionsFromLocalStorage,
  getLearntQuestionsLocalStorageKey,
  QuestionId,
  removeLearntQuestionFromLocalStorage,
} from './useLearntQuestions.utils';

interface UseLearntQuestionsError {
  state: 'error';
}

interface UseLearntQuestionsLoading {
  state: 'loading';
}

interface UseLearntQuestionsDone {
  state: 'done';
  data: {
    questions: LearntQuestions;
    setQuestion: (questionId: QuestionId, action: 'add' | 'remove') => void;
  };
}

type UseLearntQuestions =
  | UseLearntQuestionsError
  | UseLearntQuestionsLoading
  | UseLearntQuestionsDone;

export const useLearntQuestions = (
  subjectData: UseSubjectData,
): UseLearntQuestions => {
  const [learntQuestions, setLearntQuestions] = useState<LearntQuestions>();

  useEffect(() => {
    if (subjectData.state === 'done') {
      const learntQuestionsKey = getLearntQuestionsLocalStorageKey(
        subjectData.data.id,
      );
      setLearntQuestions(
        getLearntQuestionsFromLocalStorage(learntQuestionsKey),
      );
    }
  }, [subjectData]);

  return useMemo(() => {
    if (subjectData.state === 'error') {
      return {
        state: 'error',
      };
    }

    if (subjectData.state === 'loading') {
      return {
        state: 'loading',
      };
    }

    const addQuestion = (questionId: QuestionId) => {
      const learntQuestionsKey = getLearntQuestionsLocalStorageKey(
        subjectData.data.id,
      );
      addLearntQuestionToLocalStorage(learntQuestionsKey, questionId);
      setLearntQuestions(
        getLearntQuestionsFromLocalStorage(learntQuestionsKey),
      );
    };

    const removeQuestion = (questionId: QuestionId) => {
      const learntQuestionsKey = getLearntQuestionsLocalStorageKey(
        subjectData.data.id,
      );
      removeLearntQuestionFromLocalStorage(learntQuestionsKey, questionId);
      setLearntQuestions(
        getLearntQuestionsFromLocalStorage(learntQuestionsKey),
      );
    };

    return {
      state: 'done',
      data: {
        questions: learntQuestions,
        setQuestion: (questionId: QuestionId, action: 'add' | 'remove') =>
          action === 'add'
            ? addQuestion(questionId)
            : removeQuestion(questionId),
      },
    };
  }, [learntQuestions, subjectData]);
};
