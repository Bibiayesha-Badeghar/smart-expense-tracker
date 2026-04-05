const express = require("express");
const Expense = require("../models/expense");
const router = express.Router();

// Add expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Analytics: total per category
router.get("/analytics/category", async (req, res) => {
  const result = await Expense.aggregate([
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);
  res.json(result);
});

module.exports = router;
