import md5 from 'md5';

import {
  Question,
  Comment,
  Subject,
  OverrideSubject,
  OverrideQuestion,
  NullableIdQuestionSubject,
  NullableIdQuestionOverrideSubject,
  NullableIdQuestion,
  NullableIdOverrideQuestion,
} from 'validators/subjects';

type Id = Question['id'];

type Tuple = [Id, OverrideQuestion];

const mapQuestionOverridesToMap = (questionOverrides: OverrideQuestion[]) => {
  const entries = questionOverrides.map<Tuple>((question) => [question.id, question]).filter(([id]) => Boolean(id));

  return Object.fromEntries(entries) as { [key: Id]: Question };
};

const getNewQuestions = (oldQuestions: Question[], questionOverrides: OverrideQuestion[]) => {
  const oldQuestionsIds = oldQuestions.map(({ id }) => id);

  return questionOverrides
    .filter(({ id }) => !oldQuestionsIds.includes(id))
    .map((question) => ({ ...question, id: question.id ?? null, added: true }));
};

const getCommentsWithOverrides = (question: Question, override: OverrideQuestion): Comment[] => {
  if (question.comments === null && override.comments === null) {
    return [];
  }

  const overwrittenComments = override.comments.map((comment) => ({
    ...comment,
    overwritten: true,
  }));

  return [...question.comments, ...overwrittenComments];
};

export const getDataWithOverrides = (subject: Subject, overrides: OverrideSubject | null): Subject => {
  if (overrides === null) {
    return subject;
  }

  const { data: questions } = subject;
  const { data: questionOverrides } = overrides;

  const overridesMap = mapQuestionOverridesToMap(questionOverrides);

  const data = questions.map<Question>((question) => {
    if (question.id === undefined) {
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
      id: question.id,
      comments,
      overwritten: true,
    };
  });

  const newQuestions = getNewQuestions(data, questionOverrides);

  return {
    ...subject,
    ...overrides,
    id: subject.id,
    title: overrides.title ?? subject.title,
    data: [...data, ...newQuestions],
  };
};

const generateHashIdFromQuestion = (question: NullableIdQuestion | NullableIdOverrideQuestion) => {
  return md5(`${question.question}${question.answers.map((a) => a.answer).join()}`);
};

export function generateMissingQuestionIdsForSubject(subject: NullableIdQuestionSubject): Subject;
export function generateMissingQuestionIdsForSubject(subject: NullableIdQuestionOverrideSubject): OverrideSubject;
export function generateMissingQuestionIdsForSubject(
  subject: NullableIdQuestionSubject | NullableIdQuestionOverrideSubject,
): Subject | OverrideSubject {
  const { data } = subject;

  const dataWithIds = data.map((question) => ({
    ...question,
    id: generateHashIdFromQuestion(question),
  }));

  return {
    ...subject,
    data: dataWithIds,
  };
}
