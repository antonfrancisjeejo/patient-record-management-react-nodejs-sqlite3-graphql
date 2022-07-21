const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
} = require("graphql");
const addTreatmentDB = require("../lib/treatment");

const addTreatment = {
  type: new GraphQLObjectType({
    name: "TreatmentResult",
    fields: {
      msg: { type: GraphQLString },
      treatmentId: { type: GraphQLString },
    },
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "TreatmentInputType",
        fields: {
          prescriptions: { type: GraphQLString },
          disease: { type: GraphQLString },
          category: { type: GraphQLString },
        },
      }),
    },
  },
  resolve: (source, args) => {
    return addTreatmentDB(
      args.input.prescriptions,
      args.input.disease,
      args.input.category
    );
  },
};

module.exports = addTreatment;
