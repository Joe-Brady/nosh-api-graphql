import { ApolloServer, gql } from "apollo-server";
import knex from "./data-sources/postgres/knex";

const typeDefs = gql`
  enum Category {
    fruit
    veg
    clothes
  }

  type Product {
    id: ID!
    name: String
    description: String
    price: Float
    category: Category
    quantity: Int
  }

  type Query {
    products: [Product]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    products: async () =>
      await knex
        .select("id", "name", "description", "price", "category", "quantity")
        .from("products")
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
