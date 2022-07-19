const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");
const TreatmentType = require("./treatment");

const PatientType = new GraphQLObjectType({
  name: "PatientType",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    address: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    age: { type: GraphQLInt },
    doctor: { type: GraphQLString },
    date: { type: GraphQLString },
    amount: { type: GraphQLInt },
    treatment: { type: TreatmentType },
  },
});

module.exports = PatientType;
