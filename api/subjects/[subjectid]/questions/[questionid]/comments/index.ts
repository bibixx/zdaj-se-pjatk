import { NowRequest, NowResponse } from '@vercel/node';
import commentController from '../../../../../../backend/comments/comments.controller';
import respond from '../../../../../../backend/util/respond';

export default (req: NowRequest, res: NowResponse): void => {
  if (req.method === 'POST') {
    commentController(req, res);
    return;
  }

  respond(res, {}, 404);
};
