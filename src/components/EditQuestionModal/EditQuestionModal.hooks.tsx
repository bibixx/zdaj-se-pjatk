import { useErrorHandler } from 'hooks/useErrorHandler/useErrorHandler';
import { useEffect, useState } from 'react';
import { Question } from 'validators/subjects';
import { OutputOverrideSubject } from './EditQuestionModal.types';

interface UseSaveArguments {
  overrides: OutputOverrideSubject | null;
  questionId: string;
  subjectId: string;
}
export const useSaveOverride = ({
  overrides,
  questionId,
  subjectId,
}: UseSaveArguments) => {
  const errorHandler = useErrorHandler();
  const [overridesSubmitted, setOverridesSubmitted] = useState<
    'new' | 'edit' | null
  >(null);
  const [overridesString, setOverridesString] = useState<string>('');
  const onOverridesSave = (
    formState: FormState,
    notNullOverrides: OutputOverrideSubject,
  ) => {
    const numberedQuestionId = +questionId;

    let found = false;
    const newData: OutputOverrideSubject['data'] = notNullOverrides.data.map(
      (q) => {
        if (q.id !== numberedQuestionId) {
          return q;
        }

        found = true;
        return {
          ...q,
          id: q?.id,
          question: formState.question,
          isMarkdown: formState.isMarkdown,
          answers: q
            ? q.answers?.map((a, i) => ({
                ...a,
                ...(formState.answers[i] ?? {}),
              }))
            : formState.answers,
        };
      },
    );

    if (!found) {
      newData.push({
        question: formState.question,
        isMarkdown: formState.isMarkdown,
        answers: formState.answers,
      });
    }

    const newOverrides: OutputOverrideSubject = {
      $schema: notNullOverrides.$schema,
      id: notNullOverrides.id,
      title: notNullOverrides.title,
      updatedAt: Date.now(),
      data: newData,
    };

    setOverridesSubmitted('edit');
    setOverridesString(JSON.stringify(newOverrides, null, 2));
  };
  const onNewSave = (formState: FormState) => {
    const numberedQuestionId = +questionId;

    const newOverrides: OutputOverrideSubject = {
      $schema: '../schemas/subject-override.json',
      id: subjectId,
      updatedAt: Date.now(),
      data: [
        {
          id: numberedQuestionId,
          question: formState.question,
          isMarkdown: formState.isMarkdown,
          comments: [],
          answers: formState.answers.map((a) => ({
            answer: a.answer,
            correct: a.correct,
            isMarkdown: a.isMarkdown,
          })),
        },
      ],
    };

    setOverridesSubmitted('new');
    setOverridesString(JSON.stringify(newOverrides, null, 2));
  };

  const onSave = (formState: FormState): void => {
    try {
      if (overrides) {
        onOverridesSave(formState, overrides);
      } else {
        onNewSave(formState);
      }
    } catch (error) {
      errorHandler(error as any);
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
