import EmployeeModel from "../models/employee.js";
import ClientModel from "../models/clients.js"; 
import bcryptjs from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const { name, password, age, gender, phone, email, rol } = req.body;

  try {
    // Verificar si ya existe un empleado con ese email
    const existEmployee = await EmployeeModel.findOne({ email });
    // Verificar si ya existe un cliente con ese email
    const existClient = await ClientModel.findOne({ email });

    if (existEmployee || existClient) {
      return res.status(400).json({ message: "Este correo ya está registrado" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const newEmployee = new EmployeeModel({
      name,
      password: passwordHash,
      age,
      gender,
      phone,
      email,
      rol,
      imagen: imageUrl,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Empleado guardado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

export default registerEmployeesController;
