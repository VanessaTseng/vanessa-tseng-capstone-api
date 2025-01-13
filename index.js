import "dotenv/config";
import express from "express";
import cors from "cors";

import bills from "./routes/bills.js";
import items from "./routes/items.js";

// place in route
import knex from "knex";
import knexConfig from "./knexfile.js";

const { PORT } = process.env;
const app = express();

const dataBase = knex(knexConfig);

app.use(cors());
app.use(express.json());

app.use("/items", items);
// app.use("/cost_distribution", cost_distribution);
app.use("/bills", bills);

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
