import { NextApiRequest, NextApiResponse } from 'next';
import { parseToken } from './token';
import { verifyUserToken } from './admin';

export function withAuthMiddleware(
  nextHandler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = parseToken(req);
    if (!token) {
      return res.status(401).json({ status: 'NOT_AUTHENTICATED' });
    }

    try {
      await verifyUserToken(token);
    } catch (error) {
      return res.status(403).json({ status: 'NOT_AUTHORIZED' });
    }

    return nextHandler(req, res);
  };
}
