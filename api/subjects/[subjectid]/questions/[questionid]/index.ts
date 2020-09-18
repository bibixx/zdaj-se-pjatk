import { NowRequest, NowResponse } from '@vercel/node';
import questionController from '../../../../../backend/questions/question.controller';

export default (req: NowRequest, res: NowResponse) => {
  questionController(req, res);
};
