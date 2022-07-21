const PatientType = require("../schema/patient");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { allPatients, getPatient } = require("../lib/patient");

const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    patients: {
      type: new GraphQLList(PatientType),
      resolve: (parent, args) => {
        return allPatients();
      },
    },
    patientsByCategory: {
      type: new GraphQLList(PatientType),
      args: {
        category: { type: GraphQLString },
      },
      resolve: (source, args) => {
        return getPatient(args.category);
      },
    },
  },
});

module.exports = query;
