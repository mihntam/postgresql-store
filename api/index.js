const app = require("./app")();
require("dotenv").config();
var path = require("path");
const { PORT } = process.env;

const dbDetails = require("./database/details");
const pool = require("./database/pool");

pool
  .connect(dbDetails)
  .then(() => {
    console.log("> Postgres connected ");
    app.listen(PORT, () => {
      console.log(`> Express server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
// Database connection End

app.get("/", (req, res) => {
  res.send("Demo api");
});
