const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const pool = require("../database/pool");
const jwtGenerator = require("../utils/jwt-generator");

//register
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json("Fill up from correctly");
    }

    //Check email
    const user = await pool.query("SELECT *  FROM users WHERE email=$1 ", [
      email,
    ]);

    //-email exit
    if (user.rows.length !== 0) {
      return res.status(401).json("User is Already Exits");
    }

    //hash pass
    const saltRounds = 10;
    const hashAndSaltPassword = await bcrypt.hashSync(password, saltRounds);

    //Update to db
    const { rows } = await pool.query(
      "INSERT INTO users(name, email,password, phone) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, hashAndSaltPassword, phone]
    );

    //TOKEN
    const token = await jwtGenerator({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
    });

    res.json(token);
  } catch (e) {
    console.error(e.message);

    res.status(500).json(e.message);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json("Please Fill Info");
    }

    //Check email in db
    const user = await pool.query("SELECT *  FROM users WHERE email=$1 ", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("User doesn't exits");
    }

    //Check password
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(401).json("Password is Incorrect");
    }

    //TOKEN
    const { rows } = user;

    const token = await jwtGenerator({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
    });

    res.json(token);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server problem ");
  }
});

module.exports = router;
