import { NowRequest } from '@vercel/node';

const commentController = (req: NowRequest): {ok: boolean, message: string} => {
  if (req.body === undefined) {
    return { ok: false, message: 'No request body' };
  }
  const isString = (s: unknown): s is string => typeof s === 'string';
  const { contents, author } = req.body;
  if (contents === undefined || !isString(contents)) {
    return { ok: false, message: 'Content is not a string' };
  }
  if (author === undefined || !isString(author)) {
    return { ok: false, message: 'Author is not a string' };
  }
  if (req.query?.id === undefined) {
    return { ok: false, message: 'Id is not provided' };
  }
  if (Array.isArray(req.query.id)) {
    return { ok: false, message: 'Id is not a single value' };
  }
  const id = Number.parseInt(req.query.id, 10);
  if (Number.isNaN(id)) {
    return { ok: false, message: 'Id is NaN' };
  }
  return { ok: true, message: '' };
};
export default commentController;
