import { ApolloServer, gql } from "apollo-server";
import knex from "./data-sources/primary-db/knex";
import DataLoader from "dataloader";

knex.on("query", query => {
  console.log(query);
});

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
    product(id: ID!): Product
  }
`;

const dataLoaders = {
  productById: new DataLoader(
    async ids =>
      await knex("products")
        .whereIn("id", ids)
        .select()
        .then(rows => ids.map(id => rows.find(row => row.id === id)))
  )
};

const resolvers = {
  Query: {
    product: (_, { id }) => ({ id: Number(id) })
  },
  Product: {
    name: async ({ id }) =>
      await dataLoaders.productById.load(id).then(res => res.name),
    description: async ({ id }) =>
      await dataLoaders.productById.load(id).then(res => res.description),
    price: async ({ id }) =>
      await dataLoaders.productById.load(id).then(res => res.price),
    category: async ({ id }) =>
      await dataLoaders.productById.load(id).then(res => res.category),
    quantity: async ({ id }) =>
      await dataLoaders.productById.load(id).then(res => res.quantity)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
