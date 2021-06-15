import * as yup from 'yup';

export const pageSchema = yup.object().shape({
  title: yup.string().ensure(),
  id: yup.string().ensure(),
});

export const pagesSchema = yup.object().shape({
  pages: yup.array().of(pageSchema).ensure(),
  updatedAt: yup.number(),
});

export type Page = yup.Asserts<typeof pageSchema>;
export type Pages = yup.Asserts<typeof pagesSchema>;
