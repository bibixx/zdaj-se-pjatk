import { JsonDecoder } from 'ts.data.json';
import { Answer } from '../../shared/types/answer';
import { QuestionReqDTO } from '../../shared/types/question.requestDTO';

const answerDecoder = JsonDecoder.object<Answer>(
  {
    answer: JsonDecoder.string,
    correct: JsonDecoder.boolean,
  },
  'Answer'
);
const bodyDecoder = JsonDecoder.object<QuestionReqDTO>(
  {
    question: JsonDecoder.string,
    answers: JsonDecoder.array<Answer>(answerDecoder, 'Answers[]'),
  },
  'QuestionReqDTO'
);

export const isQuestionReqDTO = (body: unknown): body is QuestionReqDTO => {
  const res = bodyDecoder.decode(body);
  return res.isOk();
};

export const isQuestionQueryOk = (subjectId: unknown): subjectId is string => {
  const res = JsonDecoder.string.decode(subjectId);
  return res.isOk();
};
