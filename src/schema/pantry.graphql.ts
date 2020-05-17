import { gql } from 'apollo-server-micro';

export type PantryContext = {
  // should I put loaders here? or just require them
  // might just require them
  // the internet seems to think everything shared should go here...
  user: string | null;
};

export const schema = gql`
  type Query {
    pantry: [PantryItem!]!
  }

  type PantryItem {
    id: ID!
    name: String!
    icon_url: String!
    is_deleted: Boolean!
    expires_in: String!
    created_at_ts: Float!
    quantity_type: QuantityType!
    quantities: [Quantity!]!
  }

  type Quantity {
    added_date_ts: Float!
    last_modified_ts: Float!
    is_deleted: Boolean!
    quantity: Int!
  }

  enum QuantityType {
    range
    unit
  }
`;
