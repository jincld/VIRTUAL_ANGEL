// controllers/registerEmployeesController.js
import EmployeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import { v2 as cloudinary } from "cloudinary";


const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const { name, password, age, gender, phone, email, rol } = req.body;

  try {
    const existEmployee = await EmployeeModel.findOne({ email });
    if (existEmployee) return res.status(400).json({ message: "El empleado ya existe" });

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

    // No tocar la cookie authToken ni generar token acá
    res.status(201).json({ message: "Empleado guardado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el registro" });
  }
};


export default registerEmployeesController;
