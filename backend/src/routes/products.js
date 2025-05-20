import express from "express";
import productsController from "../controllers/productsController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(productsController.getProduct)
  .post(upload.single("image"), productsController.insertProduct);

router
  .route("/:id")
  .put(upload.single("image"), productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;