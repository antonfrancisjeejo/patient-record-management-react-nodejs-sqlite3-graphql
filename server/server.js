const express = require("express");
const cors = require("cors");
const app = express();
const patientsRouter = require("./routes/patients");
const treatmentsRouter = require("./routes/treatments");

//cors for sharing data between two different origins.
app.use(cors());
//for handling json data middleware.
app.use(express.json());

//route for patients api
app.use("/patients", patientsRouter);

//route for treatments api
app.use("/treatments", treatmentsRouter);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(4000, () => {
  console.log("Server is up and running");
});
