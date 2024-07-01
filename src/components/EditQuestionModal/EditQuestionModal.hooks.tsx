import { useEffect, useState } from 'react';

import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { OverrideQuestion, Question } from 'validators/subjects';

import { OutputOverrideSubjectQuestion } from './EditQuestionModal.types';

function stringify(data: unknown) {
  return JSON.stringify(data, null, 2) + '\n';
}

interface UseSaveArguments {
  overrides: OverrideQuestion | null;
  questionId: string;
  subjectId: string;
}
export const useSaveOverride = ({ overrides, questionId }: UseSaveArguments) => {
  const errorHandler = useErrorHandler();
  const [overridesSubmitted, setOverridesSubmitted] = useState<'new' | 'edit' | null>(null);
  const [overridesString, setOverridesString] = useState<string>('');
  const onOverridesSave = (formState: FormState, notNullOverrides: OverrideQuestion) => {
    const newData: OutputOverrideSubjectQuestion = {
      ...notNullOverrides,
      question: formState.question,
      isMarkdown: formState.isMarkdown,
      answers: formState.answers,
      updatedAt: Date.now(),
    };

    setOverridesSubmitted('edit');
    setOverridesString(stringify(newData));
  };
  const onNewSave = (formState: FormState) => {
    const newData: OutputOverrideSubjectQuestion = {
      id: questionId,
      question: formState.question,
      isMarkdown: formState.isMarkdown,
      answers: formState.answers,
      updatedAt: Date.now(),
    };

    setOverridesSubmitted('new');
    setOverridesString(stringify(newData));
  };

  const onSave = (formState: FormState): void => {
    try {
      if (overrides) {
        onOverridesSave(formState, overrides);
      } else {
        onNewSave(formState);
      }
    } catch (error) {
      errorHandler(error as Error);
    }
  };

  const onGoBack = () => {
    setOverridesSubmitted(null);
    setOverridesString('');
  };

  return {
    onSave,
    overridesSubmitted,
    overridesString,
    onGoBack,
  };
};

interface FormState {
  question: string;
  isMarkdown: boolean;
  answers: { answer: string; correct: boolean; isMarkdown: boolean }[];
}

export const useForm = (question: Question | null) => {
  const [state, setState] = useState<FormState | null>(null);

  useEffect(() => {
    if (question === null) {
      return;
    }

    setState({
      question: question.question,
      isMarkdown: question.isMarkdown,
      answers: question.answers.map((a) => ({
        answer: a.answer,
        correct: a.correct,
        isMarkdown: a.isMarkdown,
      })),
    });
  }, [question]);

  const onQuestionChange = (questionValue: string) => {
    if (state == null) {
      return;
    }

    setState({
      ...state,
      question: questionValue,
    });
  };

  const onQuestionMarkdownChange = (isMarkdown: boolean) => {
    if (state == null) {
      return;
    }

    setState({
      ...state,
      isMarkdown,
    });
  };

  const onAnswerTextChange = (answerValue: string, answerIndex: number) => {
    if (state == null) {
      return;
    }

    const newAnswers = state.answers.map((a, i) => {
      if (i !== answerIndex) {
        return a;
      }

      return {
        ...a,
        answer: answerValue,
      };
    });

    setState({
      ...state,
      answers: newAnswers,
    });
  };

  const onAnswerCorrectChange = (correct: boolean, answerIndex: number) => {
    if (state == null) {
      return;
    }

    const newAnswers = state.answers.map((a, i) => {
      if (i !== answerIndex) {
        return a;
      }

      return {
        ...a,
        correct,
      };
    });

    setState({
      ...state,
      answers: newAnswers,
    });
  };

  const onAnswerMarkdownChange = (isMarkdown: boolean, answerIndex: number) => {
    if (state == null) {
      return;
    }

    const newAnswers = state.answers.map((a, i) => {
      if (i !== answerIndex) {
        return a;
      }

      return {
        ...a,
        isMarkdown,
      };
    });

    setState({
      ...state,
      answers: newAnswers,
    });
  };

  return {
    formState: state,
    onQuestionChange,
    onAnswerTextChange,
    onAnswerCorrectChange,
    onAnswerMarkdownChange,
    onQuestionMarkdownChange,
  };
};
