import express from "express";
const router = express.Router();
export default router;
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// POST /items (Posts items in to specific bill)
router.route("/").post(async (req, res) => {
  const { bill_id, qty, item_name, item_price } = req.body;

  if (!bill_id || !qty || !item_name || !item_price) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const [item_id] = await knex("items").insert({
      bill_id,
      qty,
      item_name,
      item_price,
    });

    res.status(201).json({
      item_id,
      bill_id,
      item_name,
      qty,
      item_price,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to upload items" });
  }
});
