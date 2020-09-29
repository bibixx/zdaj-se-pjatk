import { NowRequest, NowResponse } from '@vercel/node';
import respond from '../util/respond';
import addNewComment from './comments.service';
import { isCommentReqDTO, isCommentQueryOk } from '../util/validateComment';

const commentController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  const { body } = req.body;
  const queryParams = {
    subjectId: req.query?.subjectid,
    questionId: req.query?.questionid,
  };

  try {
    isCommentReqDTO(body);
    isCommentQueryOk(queryParams);
    await addNewComment(
      queryParams.subjectId,
      body.author,
      body.comment,
      queryParams.questionId
    );
    respond(res, {}, 200);
  } catch (error) {
    respond(res, { error: error.message }, 400);
  }
};
export default commentController;
