import { JsonDecoder } from 'ts.data.json';
import { CommentReqDTO } from '../../shared/types/comment.requestDTO';
import { CommentQueryParams } from '../../shared/types/comment.queryParams';

const bodyDecoder = JsonDecoder.object<CommentReqDTO>(
  {
    author: JsonDecoder.string,
    comment: JsonDecoder.string,
  },
  'CommentReqDTO'
);
const queryDecoder = JsonDecoder.object<CommentQueryParams>(
  {
    subjectId: JsonDecoder.string,
    questionId: JsonDecoder.string,
  },
  'Query'
);

export const isCommentReqDTO = (body: unknown): body is CommentReqDTO => {
  const res = bodyDecoder.decode(body);
  return res.isOk();
};

export const isCommentQueryOk = (
  query: unknown
): query is CommentQueryParams => {
  const res = queryDecoder.decode(query);
  return res.isOk();
};
