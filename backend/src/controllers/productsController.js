const productsController = {};
import productsModel from "../models/products.js";

//select
productsController.getProduct = async (req, res) => {
    const products = await productsModel.find().populate("idCategory")
    res.json(products)
}

//insert
productsController.insertProduct = async (req, res) => {
  const { name, description, idCategory, sizes, prices, stock, image, color } = req.body;

  console.log("🟡 Recibido en el backend:", { name, description, idCategory, sizes, prices, stock, image, color });

  const newProduct = new productsModel({ name, description, idCategory, sizes, prices, stock, image, color });

  console.log("🔵 Documento a guardar:", newProduct);

  try {
    const savedProduct = await newProduct.save();
    console.log("🟢 Producto guardado correctamente:", savedProduct);
    res.json({ message: "Product saved" });
  } catch (error) {
    console.error("🔴 Error al guardar el producto:", error);
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
    const{name, description, idCategory, sizes, prices, stock, image, color} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id,
        {name, description, idCategory, sizes, prices, stock, image, color}, {new:true}
    );
    res.json({message: "Product updated"});
};

export default productsController;