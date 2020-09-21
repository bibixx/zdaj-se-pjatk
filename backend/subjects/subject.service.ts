import { NowResponse } from '@vercel/node';
import { Question } from '../types/question';
import { Subject } from '../types/subject';
import writeSubject from './subject.model';

const addNewSubject = (res: NowResponse, title: string, id: string): void => {
  const dbName = `../../public/data/${id}.json`;
  const data: Question[] = [];
  const newSubject: Subject = {
    title,
    id,
    data,
  };
  writeSubject(newSubject, res, dbName);
};
export default addNewSubject;
