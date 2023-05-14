import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import paymentRoute from "./Routes/paymentRoute.js";

const app = express();
dotenv.config();

const DBConnect = () => {
  mongoose
    .connect(process.env.CONNECT_STRING)
    .then(() => {
      console.log("succesfully conneted to DB");
    })
    .catch((err) => {
      throw err;
    });
};

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use("/api/payment", paymentRoute);

// connect to local server
const port = process.env.PORT || 5050;
app.listen(port, (err) => {
  if (err) throw err;
  DBConnect()
  console.log(`server succesfully running on ${port}`);
});
