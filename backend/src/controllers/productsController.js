
import productsModel from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

// GET
productsController.getProduct = async (req, res) => {
  try {
    const products = await productsModel.find().populate("idCategory");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// POST
productsController.insertProduct = async (req, res) => {
  try {
    const { name, description, idCategory, sizes, prices, stock, color } = req.body;

    // Validar campos requeridos
    if (!name || !description || !idCategory || !sizes || !prices || !stock || !color) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    let imageUrl = "";

    // Verificar si se recibió imagen
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "public",
          allowed_formats: ["jpg", "png", "jpeg"],
        });
        imageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ message: "Error al subir imagen a Cloudinary", error: uploadError.message });
      }
    } else {
      return res.status(400).json({ message: "Imagen no proporcionada" });
    }

    const newProduct = new productsModel({
      name,
      description,
      idCategory,
      sizes,
      prices,
      stock,
      image: imageUrl,
      color,
    });

    await newProduct.save();
    res.status(201).json({ message: "Producto guardado exitosamente", product: newProduct });
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    res.status(500).json({
      message: "Error interno al guardar el producto",
      error: error.message,
      stack: error.stack,
    });
  }
};


// PUT
productsController.updateProduct = async (req, res) => {
  try {
    const { name, description, idCategory, sizes, prices, stock, color } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const updated = await productsModel.findByIdAndUpdate(
      req.params.id,
      { name, description, idCategory, sizes, prices, stock, image: imageUrl, color },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// DELETE
productsController.deleteProduct = async (req, res) => {
  try {
    const deleted = await productsModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

export default productsController;

