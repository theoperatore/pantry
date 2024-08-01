import { db } from '@/db';

export function getAllPantriesForUser(user_id: string) {
  return db
    .selectFrom('pantry')
    .selectAll()
    .where('owner_id', '=', user_id)
    .orderBy('updated_at', 'desc')
    .execute();
}
