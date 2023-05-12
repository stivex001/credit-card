import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true },
  cardHolder: { type: String, required: true },
  expiryDate: { type: Number, required: true },
  cvv: { type: Number, required: true },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
