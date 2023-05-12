import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(8080, () => {
    DBConnect()
  console.log(`listening on port 8080 `);
});
