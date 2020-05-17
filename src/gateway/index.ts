import { PantryItem } from '../schema/generated';

type NewPantryItem = Omit<Omit<PantryItem, 'id'>, 'created_at_ts'>;

function getHeaders(user: string) {
  return {
    authorization: `token ${user}`,
    accept: 'application/json',
    'content-type': 'application/json',
  };
}

export function addItemTopPantry(user: string, newItem: NewPantryItem) {
  return fetch('/api/pantry', {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: getHeaders(user),
  });
}

export function addQuantityToItem(
  user: string,
  itemId: string,
  quantity: number
) {
  return fetch(`/api/item/${itemId}/quantities`, {
    method: 'POST',
    headers: getHeaders(user),
    body: JSON.stringify({
      quantity,
    }),
  });
}

export function useQuantityItem(
  user: string,
  itemId: string,
  numberToUse: number = 1
) {
  return fetch(`/api/item/${itemId}/quantities`, {
    method: 'PUT',
    headers: getHeaders(user),
    body: JSON.stringify({
      numberToUse,
    }),
  });
}
