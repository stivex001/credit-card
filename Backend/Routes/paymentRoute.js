import Payment from "./models/payment";

router.post("/payments", async (req, res) => {
  try {
    const { cardNumber, cardHolder, expiryDate, cvc, amount } = req.body;

    const payment = new Payment({
      cardNumber,
      cardHolder,
      expiryDate,
      cvc,
    });

    await payment.save();

    res.status(201).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: "Error processing payment" });
  }
});
