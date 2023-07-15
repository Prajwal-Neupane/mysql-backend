import mysql from "mysql";
import "dotenv/config.js";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DBNAME,
});

connection.connect((err) => {
  err ? console.log(err) : console.log("Connected successfully");
});

export default connection;
