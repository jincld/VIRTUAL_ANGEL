import productsModel from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

//1- Configurar cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

//select
productsController.getProduct = async (req, res) => {
    const products = await productsModel.find().populate("idCategory")
    res.json(products)
}

//insert
productsController.insertProduct = async (req, res) => {
  const { name, description, idCategory, sizes, prices, stock, color } = req.body;
  let imageUrl = "";

  try {
    if (req.file) {
      // Subir imagen a Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = result.secure_url;
    }

    const newProduct = new productsModel({
      name,
      description,
      idCategory,
      sizes,
      prices,
      stock,
      color,
      imagen: imageUrl, // aquí va la URL
    });

    const savedProduct = await newProduct.save();
    console.log("🟢 Producto guardado: ID", savedProduct._id);
    res.json({ message: "Product saved" });
  } catch (error) {
    console.error("🔴 Error al guardar el producto:", error.message);
    res.status(500).json({ message: "Error al guardar el producto", error: error.message });
  }
};


//delete
productsController.deleteProduct = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Product deleted"})
}

//update
productsController.updateProduct = async (req, res) => {
  const { name, description, idCategory, sizes, prices, stock, color } = req.body;

  try {
    const existingProduct = await productsModel.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    let imageUrl = existingProduct.imagen; // mantener imagen anterior por defecto

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = result.secure_url;
    }

    await productsModel.findByIdAndUpdate(req.params.id, {
      name,
      description,
      idCategory,
      sizes,
      prices,
      stock,
      color,
      imagen: imageUrl,
    });

    res.json({ message: "Product updated" });
  } catch (error) {
    console.error("🔴 Error al actualizar el producto:", error.message);
    res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};


export default productsController;