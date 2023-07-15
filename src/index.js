import express from "express";
import connection from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.get("/books", (req, res) => {
  connection.query("SELECT * FROM books", (err, result) => {
    if (err) res.json(err);
    return res.json(result);
  });
});

app.post("/books", (req, res) => {
  const data = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];

  connection.query(data, [values], (err, result) => {
    if (err) res.json(err);
    return res.json(result);
  });
});

app.delete("/books/:id", (req, res) => {
  const data = "DELETE FROM books WHERE id =?";
  const values = [req.params.id];
  connection.query(data, [values], (err, result) => {
    if (err) res.json(err);
    return res.json(result);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const data =
    "UPDATE books SET `title` = ?, `description` = ?, `cover` = ? WHERE id =?";
  const values = [req.body.title, req.body.description, req.body.cover];
  connection.query(data, [...values, bookId], (err, result) => {
    if (err) res.json(err);
    return res.json(result);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
