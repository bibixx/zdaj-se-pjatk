import { NowRequest, NowResponse } from '@vercel/node';

const isString = (s: unknown): s is string => typeof s === 'string';

export default (req: NowRequest, res: NowResponse): void => {
  if (req.body === undefined) {
    res.json({
      ok: false,
      error: 'No request body',
    });
    return;
  }
  const { contents, author } = req.body;
  if (contents === undefined || !isString(contents)) {
    res.json({
      ok: false,
      error: 'Content is not a string',
    });
    return;
  }
  if (author === undefined || !isString(author)) {
    res.json({
      ok: false,
      error: 'Author is not a string',
    });
    return;
  }
  if (req.query?.id === undefined) {
    res.json({
      ok: false,
      error: 'Id is not provided',
    });
    return;
  }
  if (Array.isArray(req.query.id)) {
    res.json({
      ok: false,
      error: 'Id is not a single value',
    });
    return;
  }
  const id = Number.parseInt(req.query.id, 10);
  if (Number.isNaN(id)) {
    res.json({
      ok: false,
      error: 'Id is NaN',
    });
    return;
  }
  res.json({
    ok: true,
  });
};
