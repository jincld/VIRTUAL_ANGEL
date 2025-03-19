const categoryController = {};
import categoryModel from "../models/category.js";

// SELECT
categoryController.getcategory = async (req, res) => {
  const category = await productsModel.find();
  res.json(category);
};

// INSERT
categoryController.createCategory = async (req, res) => {
  const { name, description } = req.body;
  const newCategory = new categoryModel({ name, description });
  await newCategory.save();
  res.json({ message: "category saved" });
};

// DELETE
categoryController.deleteCategory = async (req, res) => {
  const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return res.status(404).json({ message: "category not found" });
  }
  res.json({ message: "deleted category" });
};

// UPDATE
categoryController.updateCategory = async (req, res) => {
  // Solicito todos los valores
  const { name, description } = req.body;
  // Actualizo
  await categoryModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "category updated" });
};

export default categoryController;
