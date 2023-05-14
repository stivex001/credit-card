import express from "express";
import { pay, test } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", pay);
router.get("/test", test);

export default router;
