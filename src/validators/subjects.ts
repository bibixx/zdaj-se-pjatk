import * as yup from 'yup';
import { transformNull } from 'utils/transformNull';

const answerSchema = yup.object({}).shape({
  answer: yup.string().ensure(),
  correct: yup.boolean().required(),
  isMarkdown: yup.boolean().default(false),
});

const commentSchema = yup.object({}).shape({
  author: yup.string().ensure(),
  comment: yup.string().ensure(),
  date: yup.string().ensure(),
  overwritten: yup
    .boolean()
    .nullable()
    .transform(transformNull)
    .default(() => false),
  isMarkdown: yup.boolean().default(false),
});

const questionSchemaShape = {
  question: yup.string().ensure(),
  id: yup.string().transform(transformNull),
  isMarkdown: yup.boolean().default(false),
  comments: yup.array().of(commentSchema).nullable(true).ensure(),
  answers: yup.array().of(answerSchema).required(),
  overwritten: yup.boolean().nullable(),
  added: yup.boolean().nullable(),
};
const nullableIdQuestionSchema = yup.object({}).shape(questionSchemaShape);
const questionSchema = yup.object({}).shape({
  ...questionSchemaShape,
  id: yup.string().transform(transformNull).ensure(),
});

const overrideQuestionSchemaShape = {
  ...questionSchemaShape,
  answers: yup.array().of(answerSchema).ensure(),
};
const nullableIdOverrideQuestionSchema = yup
  .object({})
  .shape(overrideQuestionSchemaShape);
const overrideQuestionSchema = yup.object({}).shape({
  ...overrideQuestionSchemaShape,
  id: yup.string().transform(transformNull).ensure(),
});

const subjectSchemaShape = {
  id: yup.string().nullable().required(),
  title: yup.string().ensure(),
  data: yup.array().of(nullableIdQuestionSchema).required(),
  updatedAt: yup.number().required(),
};
export const nullableQuestionIdSubjectSchema = yup
  .object({})
  .shape(subjectSchemaShape);
export const subjectSchema = yup.object({}).shape({
  ...subjectSchemaShape,
  data: yup.array().of(questionSchema).required(),
});

const overrideSubjectSchemaShape = {
  ...subjectSchemaShape,
  id: yup.string(),
  title: yup.string(),
  data: yup.array().of(nullableIdOverrideQuestionSchema).required(),
};
export const nullableQuestionIdOverrideSubjectSchema = yup
  .object({})
  .shape(overrideSubjectSchemaShape);
export const overrideSubjectSchema = yup.object({}).shape({
  ...overrideSubjectSchemaShape,
  data: yup.array().of(overrideQuestionSchema).required(),
});

export const learntQuestionSchema = yup.array().of(yup.string().required());

export type NullableIdQuestion = yup.Asserts<typeof nullableIdQuestionSchema>;
export type NullableIdQuestionSubject = yup.Asserts<
  typeof nullableQuestionIdSubjectSchema
>;

export type NullableIdOverrideQuestion = yup.Asserts<
  typeof nullableIdOverrideQuestionSchema
>;
export type NullableIdQuestionOverrideSubject = yup.Asserts<
  typeof nullableQuestionIdOverrideSubjectSchema
>;

export type Answer = yup.Asserts<typeof answerSchema>;
export type Comment = yup.Asserts<typeof commentSchema>;
export type Question = yup.Asserts<typeof questionSchema>;
export type Subject = yup.Asserts<typeof subjectSchema>;

export type OverrideQuestion = yup.Asserts<typeof overrideQuestionSchema>;
export type OverrideSubject = yup.Asserts<typeof overrideSubjectSchema>;

export type LearntQuestions = yup.Asserts<typeof learntQuestionSchema>;
