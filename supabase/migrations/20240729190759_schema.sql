-- Create the update function for updated_at field
CREATE
OR REPLACE FUNCTION update_updated_at_column () RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- main pantry table
CREATE TABLE IF NOT EXISTS
  pantry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    owner_id UUID DEFAULT auth.uid () NOT NULL,
    pantry_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc', NOW()) NOT NULL
  );

-- Trigger for the pantry table
CREATE TRIGGER set_timestamp_pantry BEFORE
UPDATE ON pantry FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column ();

-- Create enum type for QuantityType
-- RANGE = thought of like a percentage range, or any number range really
-- UNIT  = meant to be like number of pieces: 5 onions, 2 potatos, 1 bunch of asparagus
CREATE TYPE quantity_type_enum AS ENUM('RANGE', 'UNIT');

-- Pantry Item table
CREATE TABLE IF NOT EXISTS
  pantry_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    pantry_id UUID NOT NULL REFERENCES pantry (id) ON DELETE CASCADE,
    pantry_item_name TEXT NOT NULL,
    icon_id TEXT NOT NULL,
    item_order INT NOT NULL DEFAULT 1,
    -- a deleted pantry item stops showing up in this pantry list
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    expires_in INTERVAL NOT NULL DEFAULT '7 days',
    quantity_type quantity_type_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc', NOW()) NOT NULL
  );

-- Trigger for the pantry item table
CREATE TRIGGER set_timestamp_pantry_item BEFORE
UPDATE ON pantry_item FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column ();

-- Quantity table; there are many quantities per item, like when you run out of an item but you still want to 
-- remember that it used to be in your pantry. I'm thinking this this history is important to capture for future stats
-- quantity is basically an instance of a pantry item, each time you buy a new amount of that item, you get a new quantity stocked
CREATE TABLE IF NOT EXISTS
  quantity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    pantry_item_id UUID NOT NULL REFERENCES pantry_item (id) ON DELETE CASCADE,
    -- stock_at + expires_in = date at which it's stale
    stocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc', NOW()) NOT NULL,
    -- a deleted quantity doesn't remove the item from the pantry, it just means
    -- we stop tracking the quantity of this instance of a stocked item.
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    -- meant to be like 75%, 80% when type is range. otherwise 6 when type is unit
    quantity INT NOT NULL
  );

-- Trigger for the quantity table
CREATE TRIGGER set_timestamp_quantity BEFORE
UPDATE ON quantity FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column ();

-- indexes for efficient querying
-- Pantry Table Indexes
-- Query all pantries for a user ordered by most recently updated
CREATE INDEX idx_pantry_owner_id_updated_at_desc ON pantry (owner_id, updated_at DESC);

-- Pantry Item Table Indexes
-- Query all items in a pantry, ordered by item_order ascending (0, 1, 2, 3, etc)
CREATE INDEX idx_panry_item_pantry_id_item_order ON pantry_item (pantry_id, item_order ASC);

-- Quantity Table Indexes
-- Query for the most recent quanatity for an item. Best used with limit 1 to get the most recent
CREATE INDEX idx_quantity_pantry_item_id_stocked_at ON quantity (pantry_item_id, stocked_at DESC);

-- New Sign Up default pantry creation trigger
CREATE
OR REPLACE FUNCTION new_user_default_pantry () RETURNS TRIGGER SECURITY DEFINER
SET
  search_path = '' AS $$
BEGIN
  -- if a user has at least 1 pantry, then don't add another
  IF NOT EXISTS (
    SELECT 1 FROM public.pantry WHERE owner_id = NEW.id
  ) THEN 
    INSERT INTO public.pantry (owner_id, pantry_name)
    VALUES (NEW.id, 'Basic Pantry');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE PROCEDURE public.new_user_default_pantry ();
