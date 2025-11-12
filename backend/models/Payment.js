const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bankName: String,
  accountNumber: String,
  cardNumber: String,
  expiryDate: String,
});

module.exports = mongoose.model("Payment", paymentSchema);
