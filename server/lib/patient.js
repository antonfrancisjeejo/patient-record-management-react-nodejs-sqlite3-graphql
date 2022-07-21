const patientsDb = require("../services/patientsDb");
const formatData = require("../utils/format");

function addPatientDb(
  name,
  gender,
  address,
  phone_number,
  age,
  doctor,
  date,
  amount,
  treatment_id
) {
  return new Promise(function (resolve, reject) {
    patientsDb.run(
      `INSERT INTO patients(name,gender,address,phone_number,age,doctor,date,amount,treatment_id) VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        name,
        gender,
        address,
        phone_number,
        age,
        doctor,
        date,
        amount,
        treatment_id,
      ],
      function (err) {
        if (err) {
          resolve({ msg: "Data not inserted", userId: "" });
        }
        if (this.lastID) {
          resolve({ msg: "Data inserted", userId: this.lastID.toString() });
        }
        resolve({ msg: "Data not inserted", userId: "" });
        // get the last insert id
      }
    );
  });
}

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

module.exports = { addPatientDb, allPatients, getPatient };
