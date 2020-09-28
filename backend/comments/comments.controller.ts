import { NowRequest, NowResponse } from '@vercel/node';
import respond from '../util/respond';
import addNewComment from './comments.service';
import { isCommentReqDTO, isQueryOk } from '../util/validateComment';

const commentController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  const { body } = req.body;
  if (!isCommentReqDTO(body)) {
    respond(res, 'Incorrect body', 400);
  }
  if (!isQueryOk(req)) {
    respond(res, 'Incorrect questionId or subjectId');
  }

  try {
    await addNewComment(
      req.query.subjectid,
      body.author,
      body.comment,
      req.query.questionId
    );
    respond(res, {}, 200);
  } catch (error) {
    respond(res, { error: error.message }, 400);
  }
};
export default commentController;
