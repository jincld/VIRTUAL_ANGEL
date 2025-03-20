const productsController = {};
import productsModel from "../models/products.js";

//select
productsController.getProduct = async (req, res) => {
    const products = await productsModel.find().populate("idCategory")
    res.json(products)
}

//insert
productsController.insertProduct = async (req, res) => {
    const {name, description, idCategory, sizes, prices, stock, image, color} = req.body;
    const newProduct = new productsModel ({name, description, idCategory, sizes, prices, stock, image, color})
    await newProduct.save()
    res.json({message: "Product saved"})
}

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