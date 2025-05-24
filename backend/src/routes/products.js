import express from "express";
import multer from "multer";
import productsController from "../controllers/productsController.js";

const router = express.Router();

//configurar una carpeta local que guarde las imagenes
const upload = multer({dest: "public/"})

router
  .route("/")
  .get(productsController.getProduct)
  .post(upload.single("imagen"), productsController.insertProduct);

router
  .route("/:id")
  .get(productsController.getProductById) 
  .put(upload.single("imagen"), productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default router;