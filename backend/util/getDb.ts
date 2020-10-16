import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Index } from '../types';
import { Database } from '../types/database';

const getDb = <T extends string, U = T extends 'index' ? Index : Database>(
  id: T
): low.LowdbSync<U> => {
  const adapter = new FileSync<U>(`public/data/${id}.json`);
  return low(adapter);
};

export default getDb;
