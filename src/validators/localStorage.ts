import { z } from 'zod';

import { LocalStorageConfig } from 'hooks/useLocalStorageState/useLocalStorageState';

export const OpenAiToken = {
  key: 'openai-token',
  validator: z.string(),
  defaultValue: null,
} satisfies LocalStorageConfig;

export const OpenAiModel = {
  key: 'openai-model',
  validator: z.union([z.literal('gpt-4-turbo-preview'), z.literal('gpt-3.5-turbo')]),
  defaultValue: 'gpt-4-turbo-preview' as const,
} satisfies LocalStorageConfig;
