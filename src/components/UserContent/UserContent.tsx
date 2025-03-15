/* eslint-disable react/no-danger */

import { useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { cn } from 'utils';
import { IMAGES_URL } from 'constants/env';
import { typeset } from 'utils/typeset';
import { joinPath } from 'utils/joinPath';

import './UserContent.css';

interface Props {
  children: string;
  isMarkdown?: boolean;
  invertImages?: boolean;
}

export const UserContent = ({ children, isMarkdown = false, invertImages = true }: Props) => {
  useLayoutEffect(() => {
    typeset();
  }, []);

  const className = cn('user-content', {
    'user-content--invert-images': invertImages,
  });

  if (isMarkdown) {
    return <ReactMarkdown className={className}>{children}</ReactMarkdown>;
  }

  return <span className={className} dangerouslySetInnerHTML={{ __html: aa(children) }} />;
};

function aa(html: string) {
  const $div = document.createElement('div');
  $div.innerHTML = html;

  const $$imgs = $div.querySelectorAll('img[data-zdaj-se]') as NodeListOf<HTMLImageElement>;
  for (const $img of $$imgs) {
    const src = $img.src;
    const fileName = src.split('/').pop() || '';

    $img.src = joinPath(IMAGES_URL, fileName);
  }

  return $div.innerHTML;
}
