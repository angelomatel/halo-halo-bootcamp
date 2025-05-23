import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  }),
});

import http from 'http';
import { createHandler } from 'graphql-http/lib/use/http';

// Create the GraphQL over HTTP Node request handler
const handler = createHandler({ schema });

// Create a HTTP server using the listener on `/graphql`
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/graphql')) {
    handler(req, res);
  } else {
    res.writeHead(404).end();
  }
});

server.listen(4000);
console.log('Listening to port 4000');