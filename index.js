import "dotenv/config";
import express from "express";
import cors from "cors";

// place in route
import knex from "knex";
import knexConfig from "./knexfile.js";

const { PORT } = process.env;
const app = express();

const dataBase = knex(knexConfig);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
