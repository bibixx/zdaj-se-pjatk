import { promises as fs } from 'fs';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Subject } from '../types/subject';
import { Index } from '../types/index';
import getDb from '../util/getDb';
import { Record } from '../types/record';

export const writeToIndex = async (record: Record): Promise<void> => {
  const db = getDb('index');
  await db.get('pages').push(record).write();
};

export const writeSubject = async (
  newSubject: Subject,
  id: string
): Promise<void> => {
  const dbName = `public/data/${id}.json`;
  await fs.writeFile(
    dbName,
    `{
  "title": "${newSubject.title}",
  "id": "${newSubject.id}",
  "data": []
}`
  );
  const record: Record = { title: newSubject.title, id: newSubject.id };
  await writeToIndex(record);
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
