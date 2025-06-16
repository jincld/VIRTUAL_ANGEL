import express from "express";
import { getToken, realPayment3ds } from "./paymentController.js";

const router = express.Router();

router.post("/token", getToken);
router.post("/payment3ds", realPayment3ds);

export default router;

