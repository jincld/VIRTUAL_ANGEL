// routes/productRoutes.js
import express from "express";
import productsController from "../controllers/productsController.js";

const router = express.Router();

// PUT con middleware de multer
router.put("/product/:id", upload.single("image"), productsController.updateProduct);

// Otras rutas si las tienes
router.get("/product", productsController.getProduct);
router.post("/product", upload.single("image"), productsController.insertProduct);
router.delete("/product/:id", productsController.deleteProduct);

export default router;
