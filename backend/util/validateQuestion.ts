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

export function isQuestionReqDTO(
  body: unknown
): asserts body is QuestionReqDTO {
  const res = bodyDecoder.decode(body);
  if (!res.isOk()) {
    throw new Error(res.error);
  }
}

export function isQuestionQueryOk(
  subjectId: unknown
): asserts subjectId is string {
  const res = JsonDecoder.string.decode(subjectId);
  if (!res.isOk()) {
    throw new Error(res.error);
  }
}
