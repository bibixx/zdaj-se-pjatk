import { JsonDecoder } from 'ts.data.json';
import { SubjectReqDTO } from '../../shared/types/subject.requestDTO';

const bodyDecoder = JsonDecoder.object<SubjectReqDTO>(
  {
    title: JsonDecoder.string,
    id: JsonDecoder.string,
  },
  'SubjectReqDTO'
);

function isSubjectReqDTO(body: unknown): asserts body is SubjectReqDTO {
  const res = bodyDecoder.decode(body);
  if (!res.isOk()) {
    throw new Error(res.error);
  }
}
export default isSubjectReqDTO;
