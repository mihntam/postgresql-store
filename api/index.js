const app = require("./app")();
require("dotenv").config();
var path = require("path");
const { PORT } = process.env;

const dbDetails = require("./database/details");
const pool = require("./database/pool");

//Database connection
pool
  .connect({ dbDetails })
  .then(() => {
    console.log("> Postgres connected ");
    // 'Server' is listening Here
    app.listen(PORT, () => {
      console.log(`> Express server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Pern-store api");
});
