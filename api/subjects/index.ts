import { NowRequest, NowResponse } from '@vercel/node';
import subjectController from '../../backend/subjects/subject.controller';
import respond from '../../backend/util/respond';

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  if (req.method === 'POST') {
    await subjectController(req, res);
    return;
  }
  respond(res, {}, 404);
};
