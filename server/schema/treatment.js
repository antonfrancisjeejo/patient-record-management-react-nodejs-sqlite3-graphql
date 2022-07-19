const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const TreatmentType = new GraphQLObjectType({
  name: "TreatmentType",
  fields: {
    id: { type: GraphQLInt },
    prescriptions: { type: GraphQLString },
    disease: { type: GraphQLString },
    category: { type: GraphQLString },
  },
});

module.exports = TreatmentType;
