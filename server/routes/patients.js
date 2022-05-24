const router = require("express").Router();
const patientsDb = require("../services/patientsDb");

//api to get all patients data
router.get("/", (req, res) => {
  try {
    patientsDb.all(
      "SELECT patients.name,patients.gender,patients.address,patients.phone_number,patients.age, patients.doctor,patients.date,patients.amount,treatments.disease, treatments.category, treatments.prescriptions FROM Patients join treatments on patients.treatment_id = treatments.id",
      [],
      (err, response) => {
        if (err) {
          throw err;
        }
        return res.json(response);
      }
    );
  } catch (error) {
    return res.json({ msg: err.message });
  }
});

//api for filtering patients data based on the treatment category
router.get("/:id", (req, res) => {
  try {
    patientsDb.all(
      `SELECT patients.name,patients.gender,patients.address,patients.phone_number,patients.age, patients.doctor,patients.date,patients.amount,treatments.disease, treatments.category, treatments.prescriptions FROM Patients join treatments on patients.treatment_id = treatments.id where treatments.category = ?`,
      [req.params.id],
      (err, response) => {
        if (err) {
          throw err;
        }
        return res.json(response);
      }
    );
  } catch (error) {
    return res.json({ msg: err.message });
  }
});

//api to add patients data to the db
router.post("/add", (req, res) => {
  const patient = req.body;
  try {
    patientsDb.run(
      `INSERT INTO patients(name,gender,address,phone_number,age,doctor,date,amount,treatment_id) VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        patient.name,
        patient.gender,
        patient.address,
        patient.phone_number,
        patient.age,
        patient.doctor,
        patient.date,
        patient.amount,
        patient.treatment_id,
      ],
      function (err) {
        if (err) {
          return res.json({ msg: err.message });
        }
        if (this.lastID) {
          return res.json({ msg: "Data inserted", userId: this.lastID });
        }
        res.json({ msg: "Data not inserted" });
        // get the last insert id
      }
    );
  } catch (error) {
    return res.json({ msg: err.message });
  }
});

module.exports = router;
