const sqlite3 = require("sqlite3").verbose();

//connects with the sqlite3 db
let db = new sqlite3.Database("./db/hospital.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the hospital database.");
});
//used to enforce foreign key relationship between two tables
db.run(`PRAGMA foreign_keys = ON`);

//treatments table for storing treatments data
db.run(
  "CREATE TABLE IF NOT EXISTS Treatments (id INTEGER PRIMARY KEY NOT NULL, prescriptions TEXT, disease TEXT NOT NULL, category TEXT NOT NULL)"
);

//patients table for storing patients data and has a reference to treatments table so that we can reference treatment data with its id.
db.run(
  "CREATE TABLE IF NOT EXISTS Patients (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, gender TEXT NOT NULL, address TEXT NOT NULL, phone_number TEXT NOT NULL UNIQUE, age NUMBER NOT NULL,doctor TEXT, date TEXT NOT NULL, amount INTEGER, treatment_id INTEGER NOT NULL, FOREIGN KEY(treatment_id) REFERENCES Treatments(id));"
);

module.exports = db;
