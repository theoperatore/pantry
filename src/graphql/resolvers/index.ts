import { Resolvers } from '../__generated__';
import { getPantry } from '../../db';

export const resolvers: Resolvers = {
  Query: {
    pantry: (_parent, _args, _context) => {
      return getPantry();
    },
  },
};
