const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const { addPatientDb } = require("../lib/patient");

const addPatient = {
  type: new GraphQLObjectType({
    name: "PatientResult",
    fields: {
      msg: { type: GraphQLString },
      userId: { type: GraphQLString },
    },
  }),
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: "PatientInputType",
        fields: {
          name: { type: GraphQLString },
          gender: { type: GraphQLString },
          address: { type: GraphQLString },
          phone_number: { type: GraphQLString },
          age: { type: GraphQLInt },
          doctor: { type: GraphQLString },
          date: { type: GraphQLString },
          amount: { type: GraphQLInt },
          treatment_id: { type: GraphQLInt },
        },
      }),
    },
  },
  resolve: (source, args) => {
    return addPatientDb(
      args.input.name,
      args.input.gender,
      args.input.address,
      args.input.phone_number,
      args.input.age,
      args.input.doctor,
      args.input.date,
      args.input.amount,
      args.input.treatment_id
    );
  },
};

module.exports = addPatient;
