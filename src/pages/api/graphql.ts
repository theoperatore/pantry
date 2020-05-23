import { ApolloServer } from 'apollo-server-micro';
import { PantryContext, schema } from '../../graphql';

const server = new ApolloServer({
  schema,
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
