import express from "express";
const router = express.Router();
export default router;
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

//GET /users (Gets user's name & photo)
router.route("/").get(async (req, res) => {
  try {
    const users = await knex("users").select("name", "photo", "id");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to get users" });
  }
});
