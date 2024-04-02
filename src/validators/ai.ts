import { z } from 'zod';

export const QuestionLanguageSchema = z.union([z.literal('pl'), z.literal('en'), z.literal('unknown')]);
export type QuestionLanguageSchema = z.infer<typeof QuestionLanguageSchema>;

export const CorrectAnswersIndexSchema = z.array(z.number().describe('0 based index of an answer'));
export type CorrectAnswersIndexSchema = z.infer<typeof CorrectAnswersIndexSchema>;

export const ExplanationSchema = z.object({
  answerIndex: z.number().describe('0 based index of an answer'),
  explanation: z
    .string()
    .describe(
      'If you see code or SQL, wrap it in code block. Please make sure to use the correct language for the code block.',
    ),
});
export type ExplanationSchema = z.infer<typeof ExplanationSchema>;

export const AiTeacherResponseSchema = z.object({
  questionLanguage: QuestionLanguageSchema,
  correctAnswersIndex: CorrectAnswersIndexSchema,
  correctExplanations: z.array(ExplanationSchema),
  incorrectExplanations: z.array(ExplanationSchema),
});
export type AiTeacherResponseSchema = z.infer<typeof AiTeacherResponseSchema>;
