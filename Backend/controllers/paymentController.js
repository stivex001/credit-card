import Payment from "../models/payment.js";

export const pay = async (req, res) => {
  try {
    const { cardNumber, cardHolder, expiryDate, cvv } = req.body;

    // Implement Luhn algorithm for card number validation
    let sum = 0;
    let double = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = Number(cardNumber[i]);
      if (double) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      double = !double;
    }
    if (sum % 10 !== 0) {
      return res.status(400).json({ message: "Invalid card number" });
    }

    // Validate expiry date
    const [expMonth, expYear] = expiryDate.split("/");
    const expDate = new Date(`20${expYear}`, expMonth - 1);
    const currentDate = new Date();
    if (expDate <= currentDate) {
      return res
        .status(400)
        .json({ message: "Your card has Expired." });
    }

    const payment = new Payment({
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
    });

    await payment.save();

    res.status(201).json({ message: "Payment successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error processing payment" });
  }
};

export const test = () => {
  console.log("test is working");
};
