import { Asserts } from 'yup';
import { subjectSchema } from 'validators/subjects';

type Subject = Asserts<typeof subjectSchema>;
type Questions = Subject['data'];
type Question = Questions[number];
type Comments = Question['comments'];
type Comment = Question['comments'][number];
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
): Comments => {
  if (question.comments === null && override.comments === null) {
    return [];
  }

  const overwrittenComments = override.comments.map(
    (comment) =>
      ({
        ...comment,
        overwritten: true,
      } as Comment),
  );

  return [...question.comments, ...overwrittenComments];
};

const areCommentsEmpty = (comments: Comments) =>
  comments === null || comments.length === 0;

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

    const comments = getCommentsWithOverrides(question, questionOverride);

    return {
      ...question,
      ...questionOverride,
      comments,
      overwritten: !areCommentsEmpty(questionOverride.comments),
    } as Question;
  });

  return {
    ...subject,
    ...overrides,
    data,
  } as Subject;
};
