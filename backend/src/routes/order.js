import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .get(orderController.getOrder)
  .post(orderController.insertOrder);

router
  .route("/:id")
  .get(orderController.getOrderById) // ✅ ESTO FALTABA
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
