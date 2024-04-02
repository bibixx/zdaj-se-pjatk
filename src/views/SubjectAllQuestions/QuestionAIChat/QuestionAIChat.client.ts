import { OpenAI } from 'openai';
import Instructor from '@instructor-ai/instructor';
import { RequestOptions } from 'openai/core';

export const getInstructorClient = (
  apiKey: string,
  abortSignal: AbortSignal,
  mode: 'JSON' | 'FUNCTIONS' | 'TOOLS' | 'MD_JSON' | 'JSON_SCHEMA' = 'JSON',
) => {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const originalCompletionsCreate = openai.chat.completions.create;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const create = function (this: unknown, body: any) {
    const options: RequestOptions = {
      signal: abortSignal,
    };
    return originalCompletionsCreate.call(this, body, options);
  };
  openai.chat.completions.create = create as unknown as typeof originalCompletionsCreate;

  return Instructor({
    client: openai,
    mode,
  });
};
