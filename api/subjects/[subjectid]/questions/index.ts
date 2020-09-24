import { NowRequest, NowResponse } from '@vercel/node';
import questionController from '../../../../backend/questions/question.controller';
import respond from '../../../../backend/util/respond';

export default (req: NowRequest, res: NowResponse): void => {
  if (req.method === 'POST') {
    questionController(req, res);
    return;
  }
  respond(res, {}, 404);
};
