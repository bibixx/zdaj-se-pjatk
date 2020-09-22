import { NowResponse } from '@vercel/node';

const respond = <T>(res: NowResponse, data: T, status = 200): void => {
  res.status(status).json({
    ok: status === 200,
    ...data,
  });
};

export default respond;
