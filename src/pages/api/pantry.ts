import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUserToken } from '../../auth/admin';
import { getPantry } from '../../db';
import { PantryResponse } from '../../schema/pantry';

export default async function pantry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST /api/pantry
  // // TODO: put all of this mutation logic in a helper function
  if (req.method === 'POST') {
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

  // GET /api/pantry
  // TODO: put the GET logic in a helper function
  if (req.method === 'GET') {
    try {
      const items = await getPantry();
      const pantryResponse: PantryResponse = {
        pantry: items,
      };

      return res.json(pantryResponse);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }

  return res.status(405).end();
}
