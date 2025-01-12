import express from "express";
const router = express.Router();
export default router;
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST /bills/:bills_id/items (Posts items in to specific bill)
router.route("/bills/:bills_id/items").post(async (req, res) => {
  const { items } = req.body;

  if (!items) {
    return res.status(400).json({ error: "Missing items in bill" });
  }

  try {
    const [item_id] = await knex("items").insert({
      qty,
      item_name,
      item_price,
    });
    res.status(201).json({ item_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to upload items" });
  }
});
