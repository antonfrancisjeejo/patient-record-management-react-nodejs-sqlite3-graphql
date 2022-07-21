const { GraphQLObjectType } = require("graphql");
const addPatient = require("./patient");
const addTreatment = require("./treatments");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPatient: addPatient,
    addTreatment: addTreatment,
  },
});

module.exports = mutationType;
