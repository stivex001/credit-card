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
      console.log("Succefully conneted to DB");
    })
    .catch((err) => {
      throw err;
    });
};

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// MIDDLEWARES

app.use(express.json());
app.use("/api/payment", paymentRoute);

app.listen(8080, () => {
  DBConnect();
  console.log(`listening on port 8080 `);
});
