import { NextApiRequest, NextApiResponse } from 'next';
import { withAuthMiddleware } from '../../../../auth/middleware';
import { addQuantityToItem, useQuantityItem } from '../../../../db';

async function quantities(req: NextApiRequest, res: NextApiResponse) {
  // Add a new quantity to an item
  if (req.method === 'POST') {
    const itemId = req.query.itemId as string;
    const { quantity } = req.body;

    if (
      quantity === undefined ||
      quantity === null ||
      typeof quantity === 'string'
    ) {
      return res.status(400).json({ status: 'BAD_PAYLOAD' });
    }

    try {
      await addQuantityToItem(itemId, quantity);
    } catch (error) {
      return res.status(500).json({ status: error.message });
    }

    return res.json({ status: 'OK' });
  }

  // Use an item
  if (req.method === 'PUT') {
    const itemId = req.query.itemId as string;
    const { numToUse } = req.body;
    const parsedNumToUse = Number(numToUse);

    if (
      numToUse === undefined ||
      numToUse === null ||
      typeof numToUse !== 'number' ||
      isNaN(parsedNumToUse)
    ) {
      return res.status(400).json({ status: 'BAD_PAYLOAD' });
    }

    try {
      const result = await useQuantityItem(itemId, parsedNumToUse);

      if (result.status === 'NOT_MODIFIED') {
        return res.status(400).json({
          status: 'BAD_REQUEST',
          message: 'Cannot use empty quantity',
        });
      }
    } catch (error) {
      return res.status(500).json({ status: error.message });
    }

    return res.status(200).json({ status: 'OK' });
  }

  // delete a quantity
  if (req.method === 'DELETE') {
    return res.status(501).json({ status: 'NOT_IMPLEMENTED' });
  }

  return res.status(405).end();
}

export default withAuthMiddleware(quantities);
