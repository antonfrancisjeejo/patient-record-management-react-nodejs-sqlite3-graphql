const PatientType = require("../schema/patient");
const patientsDb = require("../services/patientsDb");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const formatData = require("../utils/format");

function allPatients() {
  return new Promise(function (resolve, reject) {
    patientsDb.all(
      "SELECT patients.name,patients.gender,patients.address,patients.phone_number,patients.age, patients.doctor,patients.date,patients.amount,treatments.disease, treatments.category, treatments.prescriptions FROM Patients join treatments on patients.treatment_id = treatments.id",
      [],
      (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(formatData(response));
      }
    );
  });
}

function getPatient(category) {
  return new Promise(function (resolve, reject) {
    patientsDb.all(
      `SELECT patients.name,patients.gender,patients.address,patients.phone_number,patients.age, patients.doctor,patients.date,patients.amount,treatments.disease, treatments.category, treatments.prescriptions FROM Patients join treatments on patients.treatment_id = treatments.id where treatments.category = ?`,
      [category],
      (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(formatData(response));
      }
    );
  });
}

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
