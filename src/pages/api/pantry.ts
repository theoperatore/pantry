import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUserToken } from '../../auth/admin';
import { addItemToPantry } from '../../db';
import { PantryItem } from '../../graphql/__generated__';

export default async function pantry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method === 'PUT') {
  //   await bootstrapPantry();
  //   return res.status(200).end();
  // }

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

    const item: Omit<Omit<PantryItem, 'id'>, 'created_at_ts'> = JSON.parse(
      req.body
    );
    try {
      await addItemToPantry(item);
      return res.status(200).json({ status: 'OK' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ status: e.message });
    }
  }

  // delete an item
  if (req.method === 'DELETE') {
    return res.status(501).json({ status: 'NOT_IMPLEMENTED' });
  }

  return res.status(405).end();
}
