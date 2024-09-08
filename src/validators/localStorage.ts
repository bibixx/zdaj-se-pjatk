import { z } from 'zod';

import { LocalStorageConfig } from 'hooks/useLocalStorageState/useLocalStorageState';

export const OpenAiToken = {
  key: 'openai-token',
  validator: z.string(),
  defaultValue: null,
} satisfies LocalStorageConfig;

const MODEL_MAPPING = {
  'gpt-4-turbo-preview': 'gpt-4o',
  'gpt-3.5-turbo': 'gpt-4o-mini',
} as Record<string, string>;

export const OpenAiModel = {
  key: 'openai-model',
  validator: z
    .string()
    .transform((value) => MODEL_MAPPING[value] ?? value)
    .pipe(z.union([z.literal('gpt-4o'), z.literal('gpt-4o-mini')])),
  defaultValue: 'gpt-4o' as const,
} satisfies LocalStorageConfig;
