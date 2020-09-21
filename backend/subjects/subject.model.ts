import fs from 'fs';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NowResponse } from '@vercel/node';
import { Database } from '../types/database';
import { Subject } from '../types/subject';
import { Index } from '../types/index';
import { Record } from '../types/record';

const writeSubject = (
  newSubject: Subject,
  res: NowResponse,
  dbName: string
): void => {
  fs.writeFile(dbName, '', (err) => {
    if (err) {
      res.json({ ok: false, error: 'The file already exists' });
    }
  });
  const adapter = new FileSync<Database>(dbName);
  const db = low(adapter);
  db.write(newSubject);
  const record: Record = { title: newSubject.title, id: newSubject.id };
  const adapter2 = new FileSync<Index>('public/data/index.json');
  const db2 = low(adapter2);
  db2.get(['pages']).push(record).write();
  res.json({
    ok: true,
    id: newSubject.id,
  });
};
export default writeSubject;
