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
      return res.status(401).json("Vui long nhap du thong tin");
    }

    //-Check tai khoan da ton tai

    const user = await pool.query("SELECT *  FROM users WHERE email=$1 ", [
      email,
    ]);

    //Tai khoan da ton tai
    if (user.rows.length !== 0) {
      return res.status(401).json("Email da duoc su dung");
    }

    //-bcrypt password
    const saltRounds = 10;

    const hashAndSaltPassword = await bcrypt.hashSync(password, saltRounds);

    //-Luu thong tin user vao db
    const { rows } = await pool.query(
      "INSERT INTO users(name, email,password, phone) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, hashAndSaltPassword, phone]
    );

    //-Token
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

// login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json("Nhap day du thong tin");
    }

    //-Kiem tra email da ton tai trong db
    const user = await pool.query("SELECT *  FROM users WHERE email=$1 ", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Tai khoan khong ton tai");
    }

    //-Kiem tra password
    //bool
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(401).json("Password khong khop");
    }

    //Token
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
