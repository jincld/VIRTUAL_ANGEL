const customersController = {};
import clientsModel from "../models/clients.js";

// SELECT
customersController.getCustomers = async (req, res) => {
  const Customers = await clientsModel.find();
  res.json(Customers);
};

// INSERT
customersController.createCustomers = async (req, res) => {
  const { name, password, age, gender, cardNumber, address, phone, email } = req.body;
  const newCustomers = new clientsModel({ name, password, age, gender, cardNumber, address, phone, email });
  await newCustomers.save();
  res.json({ message: "Customer saved" });
};

// DELETE
customersController.deleteCustomers = async (req, res) => {
  const deletedcustomers = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "Customers not found" });
  }
  res.json({ message: "deleted Customers" });
};

// UPDATE
customersController.updateCustomers = async (req, res) => {
  // Solicito todos los valores
  const { name, password, age, gender, cardNumber, address, phone, email } = req.body;
  // Actualizo
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      password,
      age,
      gender,
      cardNumber,
      address,
      phone,
      email
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Customers updated" });
};

export default customersController;