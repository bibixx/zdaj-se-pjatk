import { Asserts } from 'yup';
import { subjectSchema } from '../validators/subjects';

type Subject = Asserts<typeof subjectSchema>;
type Questions = Subject['data'];
type Question = Questions[number];
type Id = Question['id'];

type Tuple = [Id, Question];

const mapQuestionOverridesToMap = (questionOverrides: Questions) => {
  const entries = questionOverrides
    .map<Tuple>((question) => [question.id, question])
    .filter(([id]) => Boolean(id));

  return Object.fromEntries(entries) as { [key: number]: Question };
};

const getCommentsWithOverrides = (
  question: Question,
  override: Question,
): Question['comments'] => {
  if (question.comments === null && override.comments === null) {
    return [];
  }

  return [...question.comments, ...override.comments];
};

export const getDataWithOverrides = (
  subject: Subject,
  overrides: Subject | null,
): Subject => {
  if (overrides === null) {
    return subject;
  }

  const { data: questions } = subject;
  const { data: questionOverrides } = overrides;

  const overridesMap = mapQuestionOverridesToMap(questionOverrides);

  const data = questions.map<Question>((question) => {
    if (question.id === null) {
      return question;
    }

    const questionOverride = overridesMap[question.id];

    if (!questionOverride) {
      return question;
    }

    return {
      ...question,
      ...questionOverride,
      comments: getCommentsWithOverrides(question, questionOverride),
    } as Question;
  });

  return {
    ...subject,
    ...overrides,
    data,
  } as Subject;
};
