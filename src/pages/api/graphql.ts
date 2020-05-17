import { ApolloServer } from 'apollo-server-micro';
import { Resolvers, typeDefs, PantryContext } from '../../schema';
import { getPantry } from '../../db';

const resolvers: Resolvers = {
  Query: {
    pantry: (_parent, _args, _context) => {
      return getPantry();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (connection) => {
    const auth: string | undefined = connection.req.headers.authorization;
    const validAuth = !!(auth && auth.match(/^token\s/));
    const token = auth && validAuth ? auth.replace(/^token\s/, '') : null;

    const context: PantryContext = {
      user: token,
    };

    return context;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
