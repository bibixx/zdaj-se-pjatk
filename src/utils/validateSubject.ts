import { JsonDecoder } from 'ts.data.json';
import { Subject, Answer, Comment, Question } from '../types/subject';

const commentDecoder = JsonDecoder.object<Comment>(
  {
    author: JsonDecoder.string,
    comment: JsonDecoder.string,
    date: JsonDecoder.string,
  },
  'Comment'
);

const answerDecoder = JsonDecoder.object<Answer>(
  {
    answer: JsonDecoder.string,
    correct: JsonDecoder.boolean,
  },
  'Answer'
);

const questionDecoder = JsonDecoder.object<Question>(
  {
    question: JsonDecoder.string,
    id: JsonDecoder.oneOf<string | number>(
      [JsonDecoder.string, JsonDecoder.number],
      'string | number'
    ),
    comments: JsonDecoder.nullable(
      JsonDecoder.array<Comment>(commentDecoder, 'Comment[]')
    ),
    answers: JsonDecoder.array<Answer>(answerDecoder, 'Answer[]'),
  },
  'Question'
);

const subjectDecoder = JsonDecoder.object<Subject>(
  {
    title: JsonDecoder.string,
    id: JsonDecoder.string,
    data: JsonDecoder.array<Question>(questionDecoder, 'Question[]'),
  },
  'Subject'
);

function validateSubject(element: unknown): asserts element is Subject {
  const res = subjectDecoder.decode(element);

  if (!res.isOk()) {
    throw new Error(res.error);
  }
}

export default validateSubject;
