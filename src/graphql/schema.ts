import { makeExecutableSchema } from 'graphql-tools';
import { schema as typeDefs } from './pantry.graphql';
import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
