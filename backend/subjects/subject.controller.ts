import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NowRequest, NowResponse } from '@vercel/node';
import { Index } from '../types/index';
import addNewSubject from './subject.service';

const subjectController = (req: NowRequest, res: NowResponse) => {
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
  const adapter = new FileSync<Index>('public/data/index.json');
  const db = low(adapter);
  const subjectIndex = db
    .get('pages')
    .findIndex((s) => s.id === id || s.title === title)
    .value();
  if (subjectIndex !== -1) {
    res.json({
      ok: false,
      error: 'Such subject already exists',
    });
  }
  addNewSubject(res, title, id);
};
export default subjectController;
