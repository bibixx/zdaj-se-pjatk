import { NowRequest, NowResponse } from '@vercel/node';
import addNewSubject from './subject.service';
import respond from '../util/respond';

const subjectController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  if (req.body === undefined) {
    res.json({ ok: false, error: 'No request body' });
    return;
  }
  const isString = (s: unknown): s is string => typeof s === 'string';
  const { title, id } = req.body;
  if (title === undefined || !isString(title)) {
    res.json({ ok: false, error: 'Title is not a string' });
    return;
  }
  if (id === undefined || !isString(id)) {
    res.json({ ok: false, error: 'Id is not a string' });
    return;
  }
  try {
    await addNewSubject(title, id);
    respond(res, { id }, 200);
  } catch (error) {
    respond(res, { message: error.message }, 400);
  }
};
export default subjectController;
