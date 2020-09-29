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

export function isCommentReqDTO(body: unknown): asserts body is CommentReqDTO {
  const res = bodyDecoder.decode(body);
  if (!res.isOk()) {
    throw new Error(res.error);
  }
}

export function isCommentQueryOk(
  query: unknown
): asserts query is CommentQueryParams {
  const res = queryDecoder.decode(query);
  if (!res.isOk()) {
    throw new Error(res.error);
  }
}
