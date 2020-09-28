import { NowRequest } from '@vercel/node';
import { JsonDecoder } from 'ts.data.json';
import { CommentReqDTO } from '../../shared/types/comment.requestDTO';

const bodyDecoder = JsonDecoder.object<CommentReqDTO>(
  {
    author: JsonDecoder.string,
    comment: JsonDecoder.string,
  },
  'CommentReqDTO'
);
const queryDecoder = JsonDecoder.object(
  {
    subjectid: JsonDecoder.string,
    questionid: JsonDecoder.string,
  },
  'Query'
);

export const isCommentReqDTO = (body: unknown): body is CommentReqDTO => {
  const res = bodyDecoder.decode(body);
  return res.isOk();
};
export const isQueryOk = (req: NowRequest): boolean => {
  const subjectId = req.query?.subjectid;
  const questionId = req.query?.questionid;
  const res = queryDecoder.decode({
    subjectId,
    questionId,
  });
  return res.isOk();
};
