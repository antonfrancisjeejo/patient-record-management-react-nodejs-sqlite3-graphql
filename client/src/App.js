import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./App.css";
import Modal from "./components/Modal";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [treatmentCategory, setTreatmentCategory] = useState("");

  //for getting the patients from the backend server based on the treatmentCategory
  //if treatment category is empty then all patients will be returned
  const getData = async () => {
    const { data } = await axios.get(`/patients/${treatmentCategory}`);
    setPatients(data);
  };

  useEffect(() => {
    getData();
  }, [open, treatmentCategory]);

  return (
    <div>
      <h1>Hospital Management System</h1>
      <h2>Patients</h2>
      <Modal open={open} setOpen={setOpen} />
      <button onClick={() => setOpen(true)}>Add Patient</button>
      <select onChange={(e) => setTreatmentCategory(e.target.value)}>
        <option value="">All</option>
        <option value="General">General</option>
        <option value="Emergency">Emergency</option>
        <option value="Curative">Curative</option>
        <option value="Palliative">Palliative</option>
        <option value="Preventative">Preventative</option>
      </select>
      {patients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Doctor Alloted</th>
              <th>Gender</th>
              <th>Contact No</th>
              <th>Prescriptions</th>
              <th>Treatment Category</th>
              <th>Diesease</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.doctor ? patient.doctor : "-"}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone_number}</td>
                <td>{patient.prescriptions ? patient.prescriptions : "-"}</td>
                <td>{patient.category}</td>
                <td
                  style={
                    patient.disease === "Allergie"
                      ? { color: "red", fontWeight: "bold" }
                      : null
                  }
                >
                  {patient.disease}
                </td>
                <td>{patient.amount ? patient.amount : "-"}</td>
                <td>{patient.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No patients record found</h3>
      )}
    </div>
  );
};

export default App;
