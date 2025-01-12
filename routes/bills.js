import express from "express";
const router = express.Router();
export default router;
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST /bills (Creates new bill)
router.route("/").post(async (req, res) => {
  const { bill_name } = req.body;

  if (!bill_name) {
    return res.status(400).json({ error: "Missing name for new bill" });
  }

  try {
    const [bill_id] = await knex("bills").insert({
      bill_name,
      tax: null,
      tip: null,
    });
    res.status(201).json({ bill_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to create new bill" });
  }
});

// GET /bills/:id (View a specific bill)
