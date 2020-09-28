import { NowRequest, NowResponse } from '@vercel/node';
import addNewQuestion from './question.service';
import respond from '../util/respond';
import { isQuestionQueryOk, isQuestionReqDTO } from '../util/validateQuestion';

const questionController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  const { body } = req;
  const subjectId = req.query?.subjectid;
  if (!isQuestionReqDTO(body)) {
    respond(res, { error: 'Incorrect body' }, 400);
    return;
  }
  if (!isQuestionQueryOk(subjectId)) {
    respond(res, { error: 'No such question' }, 400);
    return;
  }
  const id = await addNewQuestion(subjectId, body.question, body.answers);
  respond(res, { id }, 200);
};
export default questionController;
