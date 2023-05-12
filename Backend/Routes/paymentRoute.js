import express from "express";
import { pay } from "../controllers/paymentController.js";



const router = express.Router()

router.post("/payments", pay)

export default router;