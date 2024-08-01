import type { ColumnType } from "kysely";
import type { IPostgresInterval } from "postgres-interval";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Interval = ColumnType<IPostgresInterval, IPostgresInterval | number, IPostgresInterval | number>;

export type QuantityTypeEnum = "RANGE" | "UNIT";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Pantry {
  created_at: Generated<Timestamp>;
  id: Generated<string>;
  owner_id: Generated<string>;
  pantry_name: string;
  updated_at: Generated<Timestamp>;
}

export interface PantryItem {
  created_at: Generated<Timestamp>;
  expires_in: Generated<Interval>;
  icon_id: string;
  id: Generated<string>;
  is_deleted: Generated<boolean>;
  item_order: Generated<number>;
  pantry_id: string;
  pantry_item_name: string;
  quantity_type: QuantityTypeEnum;
  updated_at: Generated<Timestamp>;
}

export interface Quantity {
  id: Generated<string>;
  is_deleted: Generated<boolean>;
  pantry_item_id: string;
  quantity: number;
  stocked_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  pantry: Pantry;
  pantry_item: PantryItem;
  quantity: Quantity;
}
