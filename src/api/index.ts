import { PantryItem } from '../schema/pantry';

type NewPantryItem = Omit<Omit<PantryItem, 'id'>, 'created_at_ts'>;

export function addItemTopPantry(user: string, newItem: NewPantryItem) {
  return fetch('/api/pantry', {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
      authorization: `token ${user}`,
    },
  });
}

export function addQuantityToItem(
  user: string,
  itemId: string,
  quantity: number
) {
  return fetch(`/api/item/${itemId}/quantities`, {
    method: 'POST',
    headers: {
      authorization: `token ${user}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      quantity,
    }),
  });
}
