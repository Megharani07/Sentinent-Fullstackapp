const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

router.post("/add", async (req, res) => {
  try {
    const { userId, bankName, accountNumber, cardNumber, expiryDate } = req.body;
    const payment = await Payment.create({
      userId,
      bankName,
      accountNumber,
      cardNumber,
      expiryDate,
    });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const data = await Payment.findOne({ userId: req.params.userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
