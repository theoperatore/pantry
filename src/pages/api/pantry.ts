import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUserToken } from '../../auth/admin';

export default async function pantry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ status: 'NOT_AUTHENTICATED' });
  }

  try {
    const token = auth.replace(/^token\s/, '');
    await verifyUserToken(token);
  } catch (e) {
    return res.status(403).json({ status: 'NOT_AUTHORIZED' });
  }

  return res.json({ status: 'user ok' });
}
