import { db } from '@/db';
import { type Expression, type RawBuilder, type Simplify, sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';

type CastDatesToStrings<O> = {
  [K in keyof O]: O[K] extends Date ? string : O[K];
};

// https://github.com/kysely-org/kysely/issues/482
function typesafeJsonArrayFrom<O>(
  expr: Expression<O>,
): RawBuilder<CastDatesToStrings<Simplify<O>>[]> {
  // @ts-expect-error #TS2322
  return jsonArrayFrom(expr);
}

/**
 * Use this function to load the entire pantry data for rendering
 * @param pantry_id the pantry to load
 * @param user_id the owner of the pantry
 * @returns a Pantry, all it's non-deleted items ordered by item_order, and the first non-deleted quantity for each item
 */
export function getPantryAndItemsForUser(pantry_id: string, user_id: string) {
  return db
    .selectFrom('pantry')
    .where('pantry.id', '=', pantry_id)
    .where('pantry.owner_id', '=', user_id)
    .select(b => [
      'pantry.id as id',
      'pantry.pantry_name as pantry_name',
      'pantry.created_at as created_at',
      'pantry.updated_at as updated_at',
      typesafeJsonArrayFrom(
        b
          .selectFrom('pantry_item')
          .select(pi => [
            'pantry_item.id as id',
            'pantry_item.icon_id as icon_id',
            'pantry_item.pantry_item_name as pantry_item_name',
            'pantry_item.quantity_type as quantity_type',
            'pantry_item.created_at as created_at',
            'pantry_item.updated_at as updated_at',
            'pantry_item.expires_in as expires_in',
            jsonObjectFrom(
              pi
                .selectFrom('quantity')
                .select([
                  'quantity.id as id',
                  'quantity.quantity as quantity',
                  sql.raw<string>('quantity.stocked_at').as('stocked_at'),
                  'quantity.updated_at as updated_at',
                  sql
                    // this needs to be typed as a string because it's a computed column
                    // and not part of the generated types
                    // technically this is a date string, but since we're in a json block
                    // it gets converteed to a string. will need to parse in application code :(
                    // https://github.com/kysely-org/kysely/issues/482
                    .raw<string>('quantity.stocked_at + pantry_item.expires_in')
                    .as('expires_at'),
                ])
                .where('quantity.is_deleted', '=', false)
                .orderBy('quantity.stocked_at', 'desc')
                .limit(1)
                .whereRef('pantry_item.id', '=', 'quantity.pantry_item_id'),
            ).as('quantity'),
          ])
          .orderBy('pantry_item.item_order', 'asc')
          .where('pantry_item.is_deleted', '=', false)
          .whereRef('pantry.id', '=', 'pantry_item.pantry_id'),
      ).as('pantry_items'),
    ])
    .executeTakeFirst();
}
