import express from "express";
import categoryController from "../controllers/categoryController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(categoryController.getcategory)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;