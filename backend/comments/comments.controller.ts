import { NowRequest, NowResponse } from '@vercel/node';
import isString from '../util/isString';
import respond from '../util/respond';
import addNewComment from './comments.service';

const commentController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  if (req.body === undefined) {
    respond(res, { error: 'No request body' }, 400);
    return;
  }
  const { contents, author } = req.body;
  if (contents === undefined || !isString(contents)) {
    respond(res, { error: 'Content is not a string' }, 400);
    return;
  }
  if (author === undefined || !isString(author)) {
    respond(res, { error: 'Author is not a string' }, 400);
    return;
  }
  const questionId = req.query?.questionid;
  if (questionId === undefined) {
    respond(res, { error: 'Id is not provided' }, 400);
    return;
  }
  if (Array.isArray(questionId)) {
    respond(res, { error: 'Id is not a single value' }, 400);
    return;
  }
  const subject = req.query?.subjectid;
  if (subject === undefined) {
    respond(res, { error: 'Subject id is not provided' }, 400);
    return;
  }
  if (Array.isArray(subject)) {
    respond(res, { error: 'Subject id is not a single value' }, 400);
    return;
  }
  try {
    await addNewComment(subject, author, contents, questionId);
  } catch (error) {
    respond(res, { error: error.message }, 400);
  }
};
export default commentController;
