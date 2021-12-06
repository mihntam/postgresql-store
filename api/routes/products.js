const express = require("express");
const { query } = require("../database/pool");
const router = express.Router();

const pool = require("../database/pool");

router.get("/products", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    if (rows.length === 0) {
      return res.send(501).json("Don't have product");
    }
    res.json(rows);
  } catch (e) {
    console.error(e.message);
    res.status(501).json("Sever Error");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [
      id,
    ]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      return res.status(404).json("Item is not Exits");
    }
  } catch (e) {
    console.error(e.message);
    res.status(501).json("Server Error");
  }
});

router.post("/products/create", async (req, res) => {
  try {
    const { id, name, cat, img, description, price, rating } = req.body;
    if (!id || !name || !cat || !description || !price || !rating) {
      return res.status(401).json("Fill up field");
    }

    //check id product
    const product = await pool.query("SELECT *  FROM users WHERE id=$1 ", [id]);
    if (product.rows.length !== 0) {
      return res.status(401).json("Product id already exits");
    }

    //update to db
    const { rows } = await pool.query(
      "INSERT INTO products(id, name, cat, img, description, price, rating) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [id, name, cat, img, description, price, rating]
    );
    res.json({
      message: "A new product was created",
      body: {
        user: { name, cat, price },
      },
    });
  } catch (e) {
    console.error(e.message);
    res.status(501).json(e.message);
  }
});

router.put("/products/edit/:productId", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cat, img, description, price, rating } = req.body;

    const { rows } = await pool.query(
      "UPDATE products SET name = $1, cat = $2, img = $3, description = $4, price = $5, rating = $6 WHERE id = $7",
      [name, cat, img, description, price, rating, id]
    );
    res.json("Update success");
  } catch (error) {
    console.error(e.message);
    res.status(501).json("Sever Error");
  }
});

router.delete("/products/delete/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const { rows } = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING * ",
      [productId]
    );

    if (rows.length > 0) {
      res.json(rows[0]).status(204).status("Successfully Deleted");
    } else {
      return res.status(404).json("Can't delete items from products");
    }
    res.json("Item has been deleted");
  } catch (e) {
    console.error(e.message);
    res.status(501).json("Sever Error");
  }
});

module.exports = router;
