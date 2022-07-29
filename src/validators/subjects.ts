import * as yup from 'yup';
import { transformNull } from 'utils/transformNull';
import { getCounter } from 'utils/getCounter';

const answerSchema = yup.object({}).shape({
  answer: yup.string().ensure(),
  correct: yup.boolean().required(),
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

const questionSchemaEmptyIdCounter = getCounter();

const questionSchemaShape = {
  question: yup.string().ensure(),
  id: yup
    .string()
    .transform(transformNull)
    .default(() => `empty-${questionSchemaEmptyIdCounter()}`),
  isMarkdown: yup.boolean().default(false),
  comments: yup.array().of(commentSchema).nullable(true).ensure(),
  answers: yup.array().of(answerSchema).required(),
  overwritten: yup.boolean().nullable(),
  added: yup.boolean().nullable(),
};

const questionSchema = yup.object({}).shape(questionSchemaShape);

const overrideQuestionSchemaShape = {
  ...questionSchemaShape,
  answers: yup.array().of(answerSchema).ensure(),
};

const overrideQuestionSchema = yup
  .object({})
  .shape(overrideQuestionSchemaShape);

const subjectSchemaShape = {
  id: yup.string().nullable().required(),
  title: yup.string().ensure(),
  data: yup.array().of(questionSchema).required(),
  updatedAt: yup.number().required(),
};
export const subjectSchema = yup.object({}).shape(subjectSchemaShape);

const overrideSubjectSchemaShape = {
  ...subjectSchemaShape,
  id: yup.string(),
  title: yup.string(),
  data: yup.array().of(overrideQuestionSchema).required(),
};
export const overrideSubjectSchema = yup
  .object({})
  .shape(overrideSubjectSchemaShape);

export type Answer = yup.Asserts<typeof answerSchema>;
export type Comment = yup.Asserts<typeof commentSchema>;
export type Question = yup.Asserts<typeof questionSchema>;
export type Subject = yup.Asserts<typeof subjectSchema>;

export type OverrideQuestion = yup.Asserts<typeof overrideQuestionSchema>;
export type OverrideSubject = yup.Asserts<typeof overrideSubjectSchema>;
