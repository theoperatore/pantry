import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { parseToken } from '../../../../auth/token';
import { verifyUserToken } from '../../../../auth/admin';
import { getDb } from '../../../../db/getDb';
import { Quantity } from '../../../../schema/pantry';

export default async function quantities(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const token = parseToken(req);
    if (!token) {
      return res.status(401).json({ status: 'NOT_AUTHENTICATED' });
    }

    try {
      await verifyUserToken(token);
    } catch (error) {
      return res.status(403).json({ status: 'NOT_AUTHORIZED' });
    }

    const itemId = req.query.itemId as string;
    const { quantity } = req.body;
    const firestore = getDb();

    if (
      quantity === undefined ||
      quantity === null ||
      typeof quantity === 'string'
    ) {
      return res.status(400).json({ status: 'BAD_PAYLOAD' });
    }

    const itemDoc = firestore.collection('pantry-items').doc(itemId);
    const now = Date.now();
    const quant: Quantity = {
      added_date_ts: now,
      is_deleted: false,
      last_modified_ts: now,
      quantity,
    };

    try {
      await itemDoc.update({
        quantities: admin.firestore.FieldValue.arrayUnion(quant),
      });
    } catch (error) {
      return res.status(500).json({ status: error.message });
    }

    res.json({ status: 'OK' });
  } else {
    res.status(405).end();
  }
}
