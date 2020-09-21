import { NowRequest, NowResponse } from '@vercel/node';
import commentController from '../../../../../../backend/comments/comments.controller';

export default (req: NowRequest, res: NowResponse): void => {
  if (req.method === 'POST') {
    commentController(req, res);
    return;
  }

  res.status(404).json({ ok: false });
};
