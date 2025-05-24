import express from "express";
import multer from "multer";
import productsController from "../controllers/productsController.js";

const router = express.Router();

// Multer para almacenar en memoria temporal (buffer o path)
const storage = multer.memoryStorage(); // o usa diskStorage si Cloudinary necesita path
const upload = multer({ storage }); // ✅ AHORA ESTÁ DEFINIDO

// Rutas
router.get("/product", productsController.getProduct);
router.post("/product", upload.single("image"), productsController.insertProduct);
router.put("/product/:id", upload.single("image"), productsController.updateProduct);
router.delete("/product/:id", productsController.deleteProduct);

export default router;
