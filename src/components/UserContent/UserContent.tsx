/* eslint-disable react/no-danger */

import { useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { typeset } from 'utils/typeset';

import './UserContent.css';

interface Props {
  children: string;
  isMarkdown?: boolean;
}

export const UserContent = ({ children, isMarkdown = false }: Props) => {
  useLayoutEffect(() => {
    typeset();
  }, []);

  if (isMarkdown) {
    return <ReactMarkdown className="user-content">{children}</ReactMarkdown>;
  }

  return <span className="user-content" dangerouslySetInnerHTML={{ __html: children }} />;
};
