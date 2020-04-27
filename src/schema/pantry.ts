export type PantryResponse = {
  pantry: PantryItem[];
};

export type PantryItem = {
  id: string;
  name: string;
  icon_url: string;
  is_deleted: boolean;
  expires_in: 'never' | '2w' | '1w';
  quantity_type: 'range' | 'unit';
  quantities: Quantity[];
};

export type Quantity = {
  added_date_ts: number;
  last_modified_ts: number;
  is_deleted: boolean;
  quantity: number;
};
