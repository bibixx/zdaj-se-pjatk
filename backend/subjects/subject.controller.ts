import { NowRequest, NowResponse } from '@vercel/node';
import addNewSubject from './subject.service';
import respond from '../util/respond';

const subjectController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  if (req.body === undefined) {
    respond(res, { error: 'No request body' }, 400);
    return;
  }
  const isString = (s: unknown): s is string => typeof s === 'string';
  const { title, id } = req.body;
  if (title === undefined || !isString(title)) {
    respond(res, { error: 'Title is not a string' }, 400);
    return;
  }
  if (id === undefined || !isString(id)) {
    respond(res, { error: 'Id is not a string' }, 400);
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
