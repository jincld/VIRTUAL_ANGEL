// routes/paymentRoutes.js
import { Router } from "express";
import { getToken, testPaymentSin3DS } from "../controllers/paymentController.js";

const router = Router();

router.post("/get-token", getToken);
router.post("/test-payment-sin3ds", testPaymentSin3DS);

export default router;

