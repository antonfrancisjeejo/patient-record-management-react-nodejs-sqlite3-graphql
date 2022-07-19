const query = require("../query");
const mutationType = require("../mutation");
const { GraphQLSchema } = require("graphql");

const schema = new GraphQLSchema({
  query,
  mutation: mutationType,
});

module.exports = schema;
