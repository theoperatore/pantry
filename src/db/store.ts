import * as admin from 'firebase-admin';
import { getDb } from './getDb';
import { PantryItem, Quantity } from '../schema/pantry';

/**
 * @deprecated
 * ONLY FOR TESTING!! THis method adds a new pantry item to the database
 * for initial app testing
 */
export async function bootstrapPantry() {
  const testPantry: { pantry: Omit<PantryItem, 'id'>[] } = {
    pantry: [
      {
        created_at_ts: new Date(2020, 3, 20).getTime(),
        expires_in: '2w',
        is_deleted: false,
        name: 'Broccoli',
        icon_url: '/foods/icons8-lettuce-100.png',
        quantity_type: 'unit',
        quantities: [
          {
            added_date_ts: new Date(2020, 3, 20).getTime(),
            is_deleted: false,
            last_modified_ts: new Date(2020, 3, 23).getTime(),
            quantity: 2,
          },
          {
            added_date_ts: new Date(2020, 4, 1).getTime(),
            is_deleted: false,
            last_modified_ts: new Date(2020, 4, 2).getTime(),
            quantity: 5,
          },
        ],
      },
    ],
  };

  const firestore = getDb();
  const batch = firestore.batch();

  const doc = firestore.collection('/pantry-items').doc();
  batch.create(doc, testPantry.pantry[0]);

  const result = await batch.commit();
  result.map((r) => console.log(r.writeTime));
}

/**
 * Add a new item to the pantry for tracking.
 * @param item The item to add.
 */
export function addItemToPantry(
  item: Omit<Omit<PantryItem, 'id'>, 'created_at_ts'>
) {
  const firestore = getDb();
  const doc = {
    ...item,
    created_at_ts: Date.now(),
  };

  return firestore.collection('/pantry-items').doc().set(doc);
}

/**
 * Returns the entire pantry list ordered by creation date by default
 */
export async function getPantry() {
  const firestore = getDb();
  const snapshot = await firestore
    .collection('/pantry-items')
    .orderBy('created_at_ts', 'asc')
    .get();

  const docs: PantryItem[] = snapshot.docs.map<PantryItem>((doc) => {
    const data = doc.data() as PantryItem;

    // TODO: this might be a better way to handle this,
    //       but for now just use the doc.data() method.
    //       Test to make sure that an empty quantities array still has a 'map'
    //       method... otherwise default to empty array.
    // TODO: might want to use a subcollection for quantities for better
    //       long term scaling
    // const out: PantryItem = {
    //   id: doc.id,
    //   expires_in: doc.get('expires_in'),
    //   icon_url: doc.get('icon_url'),
    //   is_deleted: doc.get('is_deleted'),
    //   name: doc.get('name'),
    //   quantities: doc.get('quantities').map<Quantity>(quant => ({})),
    //   quantity_type: doc.get('quantity_type'),
    // };

    // use the document id as the id for each item.
    const out = {
      ...data,
      id: doc.id,
    };

    return out;
  });

  return docs;
}

/**
 *
 * @param itemId String, the id of the item to add to
 * @param quantity Number, the amount of item to add
 */
export function addQuantityToItem(itemId: string, quantity: number) {
  const firestore = getDb();
  const itemDoc = firestore.collection('pantry-items').doc(itemId);
  const now = Date.now();
  const quant: Quantity = {
    added_date_ts: now,
    is_deleted: false,
    last_modified_ts: now,
    quantity,
  };

  return itemDoc.update({
    quantities: admin.firestore.FieldValue.arrayUnion(quant),
  });
}

/**
 * Uses an item from the first available quantity in the quantities array.
 * @param itemId String, the id of the item to use
 * @param numToUse Number, the quantity to use
 */
export function useQuantityItem(
  itemId: string,
  numToUse: number
): Promise<{ status: 'OK' | 'NOT_MODIFIED' }> {
  const firestore = getDb();
  const itemDoc = firestore.collection('pantry-items').doc(itemId);
  const now = Date.now();
  return firestore.runTransaction(async (transaction) => {
    const documentSnapshot = await transaction.get(itemDoc);
    const quant: Quantity[] = await documentSnapshot.get('quantities');
    const indexOfStockedQuantity = quant.findIndex((q) => q.quantity > 0);

    if (indexOfStockedQuantity === -1) {
      return { status: 'NOT_MODIFIED' };
    }

    const out: Quantity[] = [
      ...quant.slice(0, indexOfStockedQuantity),
      {
        ...quant[indexOfStockedQuantity],
        last_modified_ts: now,
        quantity: Math.max(
          0,
          quant[indexOfStockedQuantity].quantity - numToUse
        ),
      },
      ...quant.slice(indexOfStockedQuantity + 1),
    ];

    transaction.update(itemDoc, { quantities: out });

    return { status: 'OK' };
  });
}
