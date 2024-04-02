import ReactMarkdown from 'react-markdown';
import { ReactNode, useLayoutEffect } from 'react';

import { Skeleton } from 'components/ui/skeleton';
import { typeset } from 'utils/typeset';

import { Lang, translateAiTokens } from './QuestionAIChat.translate';
import './QuestionAIAnswer.css';

export type QuestionAIAnswerExplanation = { index: number; answer: string; explanation: ReactNode };
interface QuestionAIAnswerProps {
  lang: Lang;
  aiCorrectAnswers: number[] | null;
  correctExplanations: QuestionAIAnswerExplanation[];
  incorrectExplanations: QuestionAIAnswerExplanation[];
}

export const QuestionAIAnswer = ({
  lang,
  correctExplanations,
  incorrectExplanations,
  aiCorrectAnswers,
}: QuestionAIAnswerProps) => {
  const correctAnswers = correctExplanations.map(({ index, answer, explanation }) => {
    return formatExplanationFromAI(index, answer, explanation);
  });
  const incorrectAnswers = incorrectExplanations.map(({ index, answer, explanation }) => {
    return formatExplanationFromAI(index, answer, explanation);
  });

  if (aiCorrectAnswers == null) {
    return (
      <div className="question-ai-answer">
        <p>
          {translateAiTokens('correctAnswersMore', lang ?? 'pl')}{' '}
          <Skeleton className="inline-block w-5 h-5 align-middle -mt-1" />,{' '}
          <Skeleton className="inline-block w-5 h-5 align-middle -mt-1" />,{' '}
          <Skeleton className="inline-block w-5 h-5 align-middle -mt-1" />
        </p>
        <h2>{translateAiTokens('correctAnswers', lang)}</h2>
        <p>
          <Skeleton className="w-[80%] h-5" />
        </p>
        <p>
          <Skeleton className="w-[50%] h-5" />
        </p>
        <p>
          <Skeleton className="w-[70%] h-5" />
        </p>
        <h2>{translateAiTokens('incorrectAnswers', lang)}</h2>
        <p>
          <Skeleton className="w-full h-5" />
        </p>
      </div>
    );
  }

  const correctAnswersHeader = translateAiTokens(
    'correctAnswersAre',
    lang ?? 'unknown',
  )(aiCorrectAnswers.map((index) => `**${getLetterBasedOnIndex(index).toUpperCase()}**`));
  return (
    <div className="question-ai-answer">
      <ReactMarkdown>{correctAnswersHeader}</ReactMarkdown>

      {correctExplanations.length > 0 && (
        <>
          <h2>{translateAiTokens('correctAnswers', lang)}</h2>
          {correctAnswers}
        </>
      )}
      {incorrectExplanations.length > 0 && (
        <>
          <h2>{translateAiTokens('incorrectAnswers', lang)}</h2>
          {incorrectAnswers}
        </>
      )}
    </div>
  );
};

interface QuestionMarkdownProps {
  children: string;
}
const QuestionMarkdown = ({ children }: QuestionMarkdownProps) => {
  useLayoutEffect(() => {
    typeset();
  }, [children]);

  return <ReactMarkdown>{children}</ReactMarkdown>;
};

function getLetterBasedOnIndex(index: number) {
  const letter = String.fromCharCode(97 + (index % 26));
  const letterList = Math.floor(index / 26) > 0 ? String.fromCharCode(96 + Math.floor(index / 26)) + letter : letter;

  return letterList;
}

function formatExplanationFromAI(index: number, answer: string, explanationText: ReactNode) {
  const letter = getLetterBasedOnIndex(index);
  const prefix = `${letter}) _${answer}_`;

  if (typeof explanationText === 'string') {
    return <QuestionMarkdown>{`${prefix} — ${explanationText}`}</QuestionMarkdown>;
  }

  return (
    <div className="contents">
      {prefix} — {explanationText}
    </div>
  );
}
