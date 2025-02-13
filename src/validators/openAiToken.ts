import { z } from 'zod';

import { LocalStorageConfig } from 'hooks/useLocalStorageState/useLocalStorageState';

export const OpenAiToken = {
  key: 'openai-token',
  validator: z.string(),
  defaultValue: null,
} satisfies LocalStorageConfig;
