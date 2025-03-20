import express from "express";
import productsController from "../controllers/productsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(productsController.getProduct)
  .post(productsController.insertProduct);

router
  .route("/:id")
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;