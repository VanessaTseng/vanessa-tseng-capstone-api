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

//GET /bills (retrieves data from specific bill)
router.route("/:billId").get(async (req, res) => {
  const { billId } = req.params;

  try {
    const billInfo = await knex("bills")
      .leftJoin("items", "bills.bill_id", "items.bill_id")
      .leftJoin(
        "cost_distribution",
        "items.item_id",
        "cost_distribution.item_id"
      )
      .leftJoin("users", "cost_distribution.friend_id", "users.id")
      .where("bills.bill_id", billId)
      .select({
        bill_id: "bills.bill_id",
        bill_name: "bills.bill_name",
        tax: "bills.tax",
        tip: "bills.tip",
        item_id: "items.item_id",
        item_name: "items.item_name",
        qty: "items.qty",
        item_price: knex.raw("CAST(items.item_price AS DECIMAL(10,2))"),
        friend_id: "users.id",
        friend_name: "users.name",
        friend_photo: "users.photo",
      });

    if (billInfo.length === 0) {
      return res.status(404).json({ error: "bill not found" });
    }
    res.json({ items: billInfo });
  } catch (error) {
    console.error("error getting bill data:", error);
  }
});

//GET /bills/:billdId/splits (retrieves summary of bill split between users)
router.route("/:billId/splits").get(async (req, res) => {
  const { billId } = req.params;

  try {
    const billItems = await knex("bills")
      .leftJoin("items", "bills.bill_id", "items.bill_id")
      .leftJoin(
        "cost_distribution",
        "items.item_id",
        "cost_distribution.item_id"
      )
      .leftJoin("users", "cost_distribution.friend_id", "users.id")
      .where("bills.bill_id", billId)
      .select({
        bill_name: "bills.bill_name",
        item_id: "items.item_id",
        item_name: "items.item_name",
        item_price: "items.item_price",
        friend_id: "users.id",
        friend_name: "users.name",
        friend_photo: "users.photo",
      });

    if (!billItems.length) {
      return res.status(404).json({ error: "No items found for the bill" });
    }

    const userSplits = {};

    billItems.forEach((item) => {
      const sharedUsersNumber = billItems.filter(
        (i) => i.item_id === item.item_id
      ).length;

      if (!userSplits[item.friend_id]) {
        userSplits[item.friend_id] = {
          friend_name: item.friend_name,
          friend_photo: item.friend_photo,
          items: [],
          total: 0,
          hst: 0,
        };
      }

      const splitAmount = parseFloat(item.item_price) / sharedUsersNumber;

      userSplits[item.friend_id].items.push({
        item_name: item.item_name,
        item_price: splitAmount,
        fraction: `1/${sharedUsersNumber}`,
      });

      userSplits[item.friend_id].total += splitAmount;
      userSplits[item.friend_id].hst = userSplits[item.friend_id].total * 0.13;
    });

    res.json({
      bill_name: billItems[0].bill_name,
      userSplits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate splits" });
  }
});
