import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import fs from 'fs';
import path from 'path';
import { Index } from '../types';
import { Database } from '../types/database';

const getDb = <T extends string, U = T extends 'index' ? Index : Database>(
  id: T
): low.LowdbSync<U> => {
  const rootDirectory = path.resolve('public/data/');
  const fileName = `${id}.json`;
  const dbName = path.join(rootDirectory, fileName);
  if (!fs.existsSync(dbName)) {
    throw new Error('Subject does not exist');
  }
  if (!dbName.startsWith(rootDirectory)) {
    throw new Error('Not valid directory');
  }
  const adapter = new FileSync<U>(dbName);
  return low(adapter);
};

export default getDb;
