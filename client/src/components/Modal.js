import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 800,
    margin: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%",
  },
}));

export default function CustomModal({ open, setOpen }) {
  const classes = useStyles();

  const [treatments, setTreatments] = useState([]);
  const [treatmentCategory, setTreatmentCategory] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [treatment_id, setTreatment_id] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  //for getting the treatments data from the backend server based on the treatmentCategory
  //if treatment category is empty then all treatment methods will be returned
  const getData = async () => {
    const { data } = await axios.get(`/treatments/${treatmentCategory}`);
    setTreatments(data);
  };

  useEffect(() => {
    getData();
  }, [treatmentCategory]);

  const addPatientData = async () => {
    //utility function to make sure that the user entered treatment id is available in the treatment record
    const isAvailable = treatments.find(
      (treatment) => treatment.id == treatment_id
    );

    if (!isAvailable) {
      alert("Please enter a valid treatment id");
      return;
    }
    if (
      !name ||
      !age ||
      !gender ||
      !phone_number ||
      !date ||
      !treatment_id ||
      !address
    ) {
      alert("Please fill all the details");
      return;
    }
    const { data } = await axios.post("/patients/add", {
      name,
      age,
      gender,
      phone_number,
      doctor,
      date,
      treatment_id,
      address,
      amount,
    });

    alert(data.msg);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1>Add a Patient</h1>
            <div>
              <label>Name: </label>
              <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <br />
              <label>Age: </label>
              <input
                placeholder="Age"
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
              <br />
              <br />
              <label>Gender: </label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
              <br />
              <br />
              <label>Contact No: </label>
              <input
                placeholder="Mobile Number"
                onChange={(e) => setPhone_number(e.target.value)}
              />
              <br />
              <br />
              <label>Alloted Doctor: </label>
              <input
                placeholder="Doctor name (if alloted)"
                onChange={(e) => setDoctor(e.target.value)}
              />
              <br />
              <br />
              <label>Entry Date: </label>
              <input type="date" onChange={(e) => setDate(e.target.value)} />
              <br />
              <br />
              <label>Treatment Id: </label>
              <input
                type="number"
                placeholder="Enter an id from the given below treatments"
                onChange={(e) => setTreatment_id(e.target.value)}
              />
              <br />
              <br />
              <label>Amount: </label>
              <input
                type="number"
                placeholder="Amount for Treatment"
                onChange={(e) => setAmount(e.target.value)}
              />
              <br />
              <br />
              <label>Address: </label>
              <textarea
                placeholder="Full Address"
                rows={3}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <br />
              <button onClick={addPatientData}>Add</button>
            </div>
            <h2>Available Treatments</h2>
            <select onChange={(e) => setTreatmentCategory(e.target.value)}>
              <option value="">All</option>
              <option value="General">General</option>
              <option value="Emergency">Emergency</option>
              <option value="Curative">Curative</option>
              <option value="Palliative">Palliative</option>
              <option value="Preventative">Preventative</option>
            </select>
            {treatments.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Treatment Id</th>
                    <th>Prescriptions</th>
                    <th>Disease</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.map((treatment, index) => (
                    <tr key={index}>
                      <td>{treatment.id}</td>
                      <td style={{ color: "green" }}>
                        {treatment.prescriptions}
                      </td>
                      <td>{treatment.disease}</td>
                      <td>{treatment.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>No treatments found</h3>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
