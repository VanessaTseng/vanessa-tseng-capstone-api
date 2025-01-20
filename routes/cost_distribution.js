import express from "express";
const router = express.Router();
export default router;
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

//POST /cost_distribution (Post items into cost distribution)
router.route("/").post(async (req, res) => {
  const { item_id, friends } = req.body;

  if (!item_id || friends.length === 0) {
    return res.status(400).json({ error: "Missing data" });
  }
  try {
    const data = friends.map((friend) => ({
      item_id: item_id,
      friend_id: friend,
    }));

    await knex("cost_distribution").insert(data);
    res.status(201).json({
      item_id,
      friends,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to add cost distribution" });
  }
});

router.route("/:item_id").get(async (req, res) => {
  const { item_id } = req.params;
  try {
    const friendsInfo = await knex("cost_distribution")
      .join("users", "cost_distribution.friend_id", "users.id")
      .where("cost_distribution.item_id", item_id)
      .select("users.id", "users.name", "users.photo");
    res.json(friendsInfo);
  } catch (error) {
    console.error(error);
  }
});
