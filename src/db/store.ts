import * as admin from 'firebase-admin';
import { getDb } from './getDb';
import { PantryResponse, PantryItem } from '../schema/pantry';

/**
 * @deprecated
 * ONLY FOR TESTING!! THis method adds a new pantry item to the database
 * for initial app testing
 */
export async function bootstrapPantry() {
  const testPantry: PantryResponse = {
    pantry: [
      {
        id: '',
        expires_in: '2w',
        is_deleted: false,
        name: 'Broccoli',
        icon_url: '/foods/icons8-lettuce-100.png',
        quantity_type: 'unit',
        quantities: [
          {
            added_date_ts: new Date(2020, 4, 20).getTime(),
            is_deleted: false,
            last_modified_ts: new Date(2020, 4, 23).getTime(),
            quantity: 2,
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

export async function getPantry() {
  const firestore = getDb();
  const snapshot = await firestore.collection('/pantry-items').get();
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
