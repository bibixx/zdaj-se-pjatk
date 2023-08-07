import * as yup from 'yup';

export const pageSchema = yup.object({}).shape({
  title: yup.string().ensure(),
  id: yup.string().ensure(),
  questionsCount: yup.number().optional().default(0),
});

export const pagesSchema = yup.object({}).shape({
  pages: yup.array().of(pageSchema).ensure().required(),
  updatedAt: yup.number().required(),
});

export type Page = yup.Asserts<typeof pageSchema>;
export type Pages = yup.Asserts<typeof pagesSchema>;
