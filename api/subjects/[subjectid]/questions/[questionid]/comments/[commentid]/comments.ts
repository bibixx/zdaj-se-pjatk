import { NowRequest, NowResponse } from '@vercel/node';
import commentController from '../../../../../../../backend/comments/controller';

export default (req: NowRequest, res: NowResponse) => {
  commentController(req, res);
};
