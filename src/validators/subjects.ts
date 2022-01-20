import * as yup from 'yup';
import { transformNull } from 'utils/transformNull';

const answerSchema = yup.object().shape({
  answer: yup.string().ensure(),
  correct: yup.boolean().required(),
});

const commentSchema = yup.object().shape({
  author: yup.string().ensure(),
  comment: yup.string().ensure(),
  date: yup.string().ensure(),
  overwritten: yup
    .boolean()
    .nullable()
    .transform(transformNull)
    .default(() => false),
});

const questionSchema = yup.object().shape({
  question: yup.string().ensure(),
  id: yup
    .number()
    .nullable()
    .transform(transformNull)
    .default(() => Math.round(Math.random() * 1000)),
  comments: yup.array().of(commentSchema).nullable(true).ensure(),
  answers: yup.array().of(answerSchema).required(),
  overwritten: yup.boolean().nullable(),
  added: yup.boolean().nullable(),
});

export const subjectSchema = yup.object().shape({
  id: yup.string().nullable().required(),
  title: yup.string().ensure(),
  data: yup.array().of(questionSchema).required(),
  updatedAt: yup.number().required(),
});

export type Answer = yup.Asserts<typeof answerSchema>;
export type Comment = yup.Asserts<typeof commentSchema>;
export type Question = yup.Asserts<typeof questionSchema>;
export type Subject = yup.Asserts<typeof subjectSchema>;
