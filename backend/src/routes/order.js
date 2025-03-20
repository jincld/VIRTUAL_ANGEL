import express from "express";
import orderController from "../controllers/orderController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(orderController.getOrder)
  .post(orderController.insertOrder);

router
  .route("/:id")
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;