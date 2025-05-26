import productsModel from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

// Obtener productos (GET)
productsController.getProduct = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// Insertar producto (POST)
productsController.insertProduct = async (req, res) => {
  const { titulo, coleccion, categoria, precio, stock, color, colorcode } = req.body;
  let imageUrl = "";

  try {
    if (req.file) {
      console.log("Imagen detectada para subir:", req.file.path); // Verificar si la imagen está presente
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = result.secure_url;
    }

    const newProduct = new productsModel({
      name: titulo,
      category: categoria,
      price: precio,
      stock,
      image: imageUrl,
      color,
      colorcode,
      coleccion,
    });

    const savedProduct = await newProduct.save();
    console.log("🟢 Producto guardado: ID", savedProduct._id);
    res.json({ message: "Product saved", id: savedProduct._id });
  } catch (error) {
    console.error("🔴 Error al guardar el producto:", error.message);
    res.status(500).json({ message: "Error al guardar el producto", error: error.message });
  }
};

// Eliminar producto (DELETE)
productsController.deleteProduct = async (req, res) => {
  try {
    console.log("ID a eliminar:", req.params.id); // Verificar el ID que se recibe

    const deletedProduct = await productsModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" }); // Manejo si el producto no existe
    }

    console.log("🟢 Producto eliminado:", req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("🔴 Error al eliminar el producto:", error.message);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// Obtener producto por ID (GET)
productsController.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("🔴 Error al obtener producto por ID:", error.message);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};


// Actualizar producto (PUT)
productsController.updateProduct = async (req, res) => {
  const { titulo, coleccion, categoria, precio, stock, color, colorcode } = req.body;
  const { id } = req.params;
  
  console.log("ID a actualizar:", id); // Verificar el ID
  console.log("Datos recibidos en update:", req.body); // Verificar los datos enviados

  let updatedData = {
    name: titulo,
    coleccion,
    category: categoria,
    price: precio,
    stock,
    color,
    colorcode
  };

  try {
    if (req.file) {
      console.log("Imagen detectada para subir:", req.file.path); // Confirmar si hay imagen
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      updatedData.image = result.secure_url;
    }

    const updatedProduct = await productsModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" }); // Manejo si el producto no existe
    }

    console.log("🟢 Producto actualizado:", updatedProduct);
    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("🔴 Error al actualizar producto:", error.message);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

export default productsController;
