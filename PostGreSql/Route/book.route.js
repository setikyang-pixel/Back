import exp from "express";
import pool from "../pool.js";
let bookRoute = exp.Router();

bookRoute.get("/", async (req, res) => {
  try {
    let result = await pool.query("SELECT * FROM book;");
    res.json(result.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

bookRoute.get("/auth",async (req,res)=>{
  try {
    let a = await pool.query("SELECT book.title, author.name FROM book JOIN author ON author.id = book.author_id;")
    res.status(200).json(a.rows)
  } catch (err) {
    console.error(err);
  }
})

bookRoute.get("/after-1900",async (req,res)=>{
  try {
    let a = await pool.query("SELECT * FROM book JOIN author ON author.id = book.author_id WHERE author.birth_year > 1900;")
    res.status(200).json(a.rows)
  } catch (err) {
    console.error(err);
  }
})

bookRoute.get("/auth-book",async (req,res)=>{
  try {
    let a = await pool.query("SELECT author.name, COUNT(book.id) FROM book JOIN author ON author.id = book.author_id GROUP BY author.id;")
     res.status(200).json(a.rows)
  } catch (err) {
    console.error(err);
  }
})

bookRoute.get("/after-auth-1",async (req,res)=>{
  try {
    let a = await pool.query("SELECT author.name, COUNT(book.id) FROM book JOIN author ON author.id = book.author_id GROUP BY author.name HAVING COUNT(book.id) > 1;")
     res.status(200).json(a.rows)
  } catch (err) {
    console.error(err);
  }
})

bookRoute.get("/info", async (req, res) => {
  try {
    let result = await pool.query(`SELECT title,price FROM book;`);
    res.json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

bookRoute.get("/status", async (req, res) => {
  try {
    let result = await pool.query("SELECT * FROM book WHERE in_stock = FALSE;");
    res.json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

//ASC format or DESC format (/:form == (ASC/DESC))
bookRoute.get("/:form", async (req, res) => {
  const { form } = req.params;
  try {
    if (form == "asc" || form == "ASC" || form == "desc" || form == "DESC") {
      let result = await pool.query(
        `SELECT * FROM book ORDER BY price ${form}`,
      );
      return res.json(result.rows);
    }
    res.status(404).send("Invalid request!!!");
  } catch (err) {
    return res.status(400).json({ error: "Invalid format. Use ASC/DESC!!!" });
  }
});

bookRoute.post("/", async (req, res) => {
  let newBook = req.body;
  if (!newBook.title || !newBook.price)
    return res.status(400).send("No data added!!!");
  try {
    let a = await pool.query(
      "INSERT INTO book (title, author_id, price, in_stock, published_date) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [
        newBook.title,
        newBook.author_id,
        newBook.price,
        newBook.in_stock,
        newBook.published_date,
      ],
    );
    res.status(201).json(a.rows[0]);
  } catch (err) {
    return res.status(400).json({ error: "Invalid arguments!!!" });
  }
});

bookRoute.put("/:id", async (req, res) => {
  const id = req.params.id;
  let { title, price } = req.body;
  if (!title || !price) return res.status(400).send("No data added!!!");
  try {
    let a = await pool.query(
      `UPDATE book SET title = $1, price = $2 WHERE id = $3 RETURNING *;`,
      [title, price, id],
    );
    if (!a.rows[0]) return res.status(404).send("Book not found!!!");
    res.status(200).json(a.rows[0]);
  } catch (err) {
    res.status(404).send("Bad request!!!");
  }
});

bookRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).send("Id not found!!!");
  try {
    const a = await pool.query(`DELETE FROM book WHERE id = $1;`, [id]);
    res.status(200).json("Book deleted successfully.");
  } catch {
    res.status(404).send("Bad request!!!");
  }
});

export default bookRoute;
