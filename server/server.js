const express = require("express");
const cors = require("cors");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
//cors for sharing data between two different origins.
app.use(cors());
//for handling json data middleware.
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(4000, () => {
  console.log("Server is up and running");
});
