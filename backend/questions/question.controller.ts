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

  try {
    isQuestionReqDTO(body);
    isQuestionQueryOk(subjectId);
    const id = await addNewQuestion(subjectId, body.question, body.answers);
    respond(res, { id }, 200);
  } catch (error) {
    respond(res, { error: error.message }, 400);
  }
};
export default questionController;
