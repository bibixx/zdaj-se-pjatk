import { NowResponse } from '@vercel/node';
import ResponseDTO from '../../shared/types/responseDTO';

const respond = <T extends Omit<ResponseDTO, 'ok'>>(
  res: NowResponse,
  data: T,
  status = 200
): void => {
  res.status(status).json({
    ok: status === 200,
    ...data,
  });
};

export default respond;
