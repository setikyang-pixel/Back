import exp from "express"
import pool from "../pool.js";
let customRoute = exp.Router();

customRoute.get("/", async (req, res) => {
  try {
    let a = await pool.query("SELECT * FROM customer;");
    res.status(200).json(a.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

customRoute.post("/", async (req, res) => {
  let newCust = req.body;
  if (!newCust.name || !newCust.email || !newCust.phone)
    return res.status(400).send("No data added!!!");
  try {
    let a = await pool.query(
      "INSERT INTO customer (name, email, phone) VALUES ($1,$2,$3) RETURNING *",
      [newCust.name, newCust.email, newCust.phone],
    );
    res.status(201).json(a.rows[0]);
  } catch (err) {
    return res.status(400).json({ error: "Invalid arguments!!!" });
  }
});


customRoute.put("/:id", async (req, res) => {
  const id = req.params.id;
  let { name, phone } = req.body;
  if (!name || !phone) return res.status(400).send("No data added!!!");
  try {
    let a = await pool.query(
      `UPDATE customer SET name = $1, phone = $2 WHERE id = $3 RETURNING *;`,
      [name, phone, id],
    );
    if (!a.rows[0]) return res.status(404).send("Customer not found!!!");
    res.status(200).json(a.rows[0]);
  } catch (err) {
    res.status(404).send("Bad request!!!");
  }
});

customRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("Id not found!!!");
  try {
    const a = await pool.query("DELETE FROM customer WHERE id = $1;", [id]);
    res.status(200).json("Customer deleted successfully.");
  } catch {
    res.status(404).send("Bad request!!!");
  }
});


export default customRoute;