import { NowRequest, NowResponse } from '@vercel/node';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface Comment {
  author: string,
  comment: string,
  date: string,
}

interface Question {
  question: string,
  id: number,
  comments: Comment[]
}

interface Database {
  title: string;
  id: string;
  data: Question[];
}

const adapter = new FileSync<Database>('../../public/dataskj.json');
const db = low(adapter);

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

  const newComment: Comment = { author, comment: contents, date: new Date(Date.now()).toString() };
  const questionIndex = db
    .get('data')
    .findIndex((question) => question.id === id)
    .value();

  db
    .get(['data', questionIndex, 'comments'])
    .push(newComment)
    .write();
};
