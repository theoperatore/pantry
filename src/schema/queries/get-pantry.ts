import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

export const GetPantryQuery = gql`
  query getPantry {
    pantry {
      id
      name
      icon_url
      is_deleted
      expires_in
      created_at_ts
      quantity_type
      quantities {
        added_date_ts
        last_modified_ts
        is_deleted
        quantity
      }
    }
  }
`;

// Need to export the query as a string so our client can
// use it as a string. it's a little silly because we have
// to parse it to get the types, then turn it back into a
// string...this is getting silly...
export const GetPantryQueryString = print(GetPantryQuery);
