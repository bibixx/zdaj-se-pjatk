import { Question } from '../types/question';
import { Subject } from '../types/subject';
import { writeSubject, checkIfSubjectExists } from './subject.model';

const addNewSubject = async (title: string, id: string): Promise<void> => {
  if (await checkIfSubjectExists(id, title)) {
    throw new Error('Subject already exists');
  }
  const data: Question[] = [];
  const newSubject: Subject = {
    title,
    id,
    data,
  };
  await writeSubject(newSubject, id);
};
export default addNewSubject;
