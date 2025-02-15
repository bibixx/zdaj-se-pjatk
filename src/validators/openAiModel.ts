import { z } from 'zod';
import { ChatModel } from 'openai/resources';

import { LocalStorageConfig } from 'hooks/useLocalStorageState/useLocalStorageState';

// The old model names that were previously allowed
const OLD_ALLOWED_MODELS = ['gpt-4-turbo-preview', 'gpt-3.5-turbo'] as const;
type OldAllowedModel = (typeof OLD_ALLOWED_MODELS)[number];

// The models that are currently allowed
export const ALLOWED_MODELS = ['gpt-4o', 'gpt-4o-mini', 'o3-mini', 'o1'] satisfies readonly ChatModel[];
export type AllowedModel = (typeof ALLOWED_MODELS)[number];
const DEFAULT_MODEL: AllowedModel = 'gpt-4o';

export const REASONING_MODELS = ['o3-mini', 'o1'] satisfies readonly AllowedModel[];

// A mapping of old model names to the new model names
const MODEL_MAPPING = {
  'gpt-4-turbo-preview': 'gpt-4o',
  'gpt-3.5-turbo': 'gpt-4o-mini',
} as Record<OldAllowedModel, AllowedModel>;

const allowedModelsUnion = buildLiteralUnionFromArray(ALLOWED_MODELS);
export const OpenAiModel = {
  key: 'openai-model',
  validator: z
    .string()
    .transform((value) => MODEL_MAPPING[value as OldAllowedModel] ?? value)
    .pipe(allowedModelsUnion),
  defaultValue: DEFAULT_MODEL,
} satisfies LocalStorageConfig;

// This function is used to build a union schema from an array of literals
function buildLiteralUnionFromArray<Literals extends readonly z.Primitive[]>(literals: Literals) {
  type LiteralForUnion = z.ZodLiteral<Literals[number]>;

  const literalsArray = literals.map((m) => z.literal(m)) as [LiteralForUnion, LiteralForUnion, ...LiteralForUnion[]];

  return z.union(literalsArray);
}

export const MODEL_NAMES: Record<AllowedModel, string> = {
  'gpt-4o': 'GPT-4o',
  'gpt-4o-mini': 'GPT-4o mini',
  o1: 'o1',
  'o3-mini': 'o3-mini',
};
