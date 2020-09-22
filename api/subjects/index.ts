import { NowRequest, NowResponse } from '@vercel/node';
import subjectController from '../../backend/subjects/subject.controller';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  if (req.method === 'POST') {
    await subjectController(req, res);
    return;
  }
  res.status(404).json({ ok: false });
};
