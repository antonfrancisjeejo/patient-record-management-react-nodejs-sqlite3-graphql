const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const patientsDb = require("../services/patientsDb");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPatient: {
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
        patientsDb.run(
          `INSERT INTO patients(name,gender,address,phone_number,age,doctor,date,amount,treatment_id) VALUES(?,?,?,?,?,?,?,?,?)`,
          [
            args.input.name,
            args.input.gender,
            args.input.address,
            args.input.phone_number,
            args.input.age,
            args.input.doctor,
            args.input.date,
            args.input.amount,
            args.input.treatment_id,
          ],
          function (err) {
            if (err) {
              return { msg: "Data not inserted", userId: "" };
            }
            if (this.lastID) {
              return { msg: "Data inserted", userId: this.lastID.toString() };
            }
            return { msg: "Data not inserted", userId: "" };
            // get the last insert id
          }
        );
      },
    },
  },
});

module.exports = mutationType;
