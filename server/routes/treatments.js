const router = require("express").Router();
const patientsDb = require("../services/patientsDb");

//api for getting all treatment methods
router.get("/", (req, res) => {
  try {
    patientsDb.all(
      `SELECT * FROM treatments`,
      [req.params.category],
      (err, response) => {
        if (err) {
          throw err;
        }
        return res.json(response);
      }
    );
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

//api for getting treatment methods based on treatment category
router.get("/:category", (req, res) => {
  try {
    patientsDb.all(
      `SELECT * FROM treatments WHERE category = ?`,
      [req.params.category],
      (err, response) => {
        if (err) {
          throw err;
        }
        return res.json(response);
      }
    );
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

//custom api to add new treatment methods
router.post("/add", (req, res) => {
  const treatment = req.body;
  try {
    patientsDb.run(
      `INSERT INTO treatments(prescriptions,disease,category) VALUES(?,?,?)`,
      [treatment.prescriptions, treatment.disease, treatment.category],
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
