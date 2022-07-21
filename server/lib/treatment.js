const patientsDb = require("../services/patientsDb");

function addTreatmentDB(prescriptions, disease, category) {
  return new Promise(function (resolve, reject) {
    patientsDb.run(
      `INSERT INTO treatments(prescriptions,disease,category) VALUES(?,?,?)`,
      [prescriptions, disease, category],
      function (err) {
        if (err) {
          return resolve({ msg: "Data not inserted", treatmentId: "" });
        }
        if (this.lastID) {
          return resolve({
            msg: "Data inserted",
            treatmentId: this.lastID.toString(),
          });
        }
        resolve({ msg: "Data not inserted", treatmentId: "" });
        // get the last insert id
      }
    );
  });
}

module.exports = addTreatmentDB;
