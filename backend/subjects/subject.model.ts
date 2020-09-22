import { promises as fs } from 'fs';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Database } from '../types/database';
import { Subject } from '../types/subject';
import { Index } from '../types/index';
import { Record } from '../types/record';

export const writeSubject = async (
  newSubject: Subject,
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
  await db2.get(['pages']).push(record).write();
};
export const checkIfSubjectExists = async (
  id: string,
  title: string
): Promise<boolean> => {
  const adapter = new FileSync<Index>('public/data/index.json');
  const db = low(adapter);
  const subjectIndex = db
    .get('pages')
    .findIndex((s) => s.id === id || s.title === title)
    .value();
  return subjectIndex !== -1;
};
