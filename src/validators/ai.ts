import * as yup from 'yup';

export const aiSchema = yup.object({}).shape({
  correctAnswersIndex: yup
    .array()
    .of(
      yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required(),
    )
    .required(),
});
