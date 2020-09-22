import { promises as fs } from 'fs';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NowResponse } from '@vercel/node';
import { Database } from '../types/database';
import { Subject } from '../types/subject';
import { Index } from '../types/index';
import { Record } from '../types/record';

const writeSubject = async (
  newSubject: Subject,
  res: NowResponse,
  id: string
): Promise<void> => {
  const dbName = `public/data/${id}.json`;
  await fs.writeFile(dbName, '');
  const adapter = new FileSync<Database>(dbName);
  const db = low(adapter);
  const dataBaseDefault: Database = {
    title: newSubject.title,
    id: newSubject.id,
    data: [],
  };
  await db.defaultTo(dataBaseDefault).write();
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
