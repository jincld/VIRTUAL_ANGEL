const customersController = {};
import clientsModel from "../models/clients.js";
import bcrypt from 'bcryptjs';

// Obtener un cliente por su ID
customersController.getCustomerID = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL

    const customer = await clientsModel.findById(id); // Busca el cliente por su ID

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Si el cliente es encontrado, devuelve los datos
    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    return res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

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
  try {
    const { name, password, age, gender, cardNumber, address, phone, email } = req.body;

    // Si la contraseña ha cambiado, ciframos la nueva contraseña
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);  // Se cifra la contraseña con 10 rondas
    }

    // Actualizamos el cliente en la base de datos
    await clientsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        password: hashedPassword,  // Guardamos la contraseña cifrada
        age,
        gender,
        cardNumber,
        address,
        phone,
        email
      },
      { new: true }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

export default customersController;