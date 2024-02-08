import { useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { typeset } from 'utils/typeset';

import './QuestionAIAnswer.css';

interface Props {
  content: string;
}

export const QuestionAIAnswer = ({ content }: Props) => {
  useLayoutEffect(() => {
    typeset();
  }, [content]);

  return <ReactMarkdown className="question-ai-answer">{content}</ReactMarkdown>;
};
