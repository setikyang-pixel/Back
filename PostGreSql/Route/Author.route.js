import exp from "express"
import pool from "../pool.js";
let authRoute = exp.Router();

authRoute.get("/authors", async (req, res) => {
  try {
    let a = await pool.query("SELECT * FROM author;");
    res.status(200).json(a.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

authRoute.post("/author", async (req, res) => {
  let newAuth = req.body;
  if (!newAuth.name || !newAuth.birth_year || !newAuth.country)
    return res.status(400).send("No data added!!!");
  try {
    let a = await pool.query(
      "INSERT INTO author (name, birth_year, country) VALUES ($1,$2,$3) RETURNING *",
      [newAuth.name, newAuth.birth_year, newAuth.country],
    );
    res.status(201).json(a.rows[0]);
  } catch (err) {
    return res.status(400).json({ error: "Invalid arguments!!!" });
  }
});

authRoute.put("/author/:id", async (req, res) => {
  const id = req.params.id;
  let { name, country } = req.body;
  if (!name || !country) return res.status(400).send("No data added!!!");
  try {
    let a = await pool.query(
      `UPDATE author SET name = $1, country = $2 WHERE id = $3 RETURNING *;`,
      [name, country, id],
    );
    if (!a.rows[0]) return res.status(404).send("Customer not found!!!");
    res.status(200).json(a.rows[0]);
  } catch (err) {
    res.status(404).send("Bad request!!!");
  }
});


authRoute.delete("/author/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("Id not found!!!");
  try {
    const a = await pool.query("DELETE FROM author WHERE id = $1;", [id]);
    res.status(200).json("Author deleted successfully.");
  } catch {
    res.status(404).send("Bad request!!!");
  }
});

export default authRoute;