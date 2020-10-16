import { NowRequest, NowResponse } from '@vercel/node';
import addNewSubject from './subject.service';
import respond from '../util/respond';
import isSubjectReqDTO from '../util/validateSubject';
import type { SubjectResDTO } from '../../shared/types/subject.responseDTO';

const subjectController = async (
  req: NowRequest,
  res: NowResponse
): Promise<void> => {
  const { body } = req;
  try {
    isSubjectReqDTO(body);
    await addNewSubject(body.title, body.id);
    respond<Omit<SubjectResDTO, 'ok'>>(res, { id: body.id }, 200);
  } catch (error) {
    respond(res, { message: error.message }, 400);
  }
};
export default subjectController;
