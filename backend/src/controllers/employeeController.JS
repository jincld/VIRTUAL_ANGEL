import employeeModel from "../models/employee.js";
import { v2 as cloudinary } from "cloudinary";
import bcryptjs from "bcryptjs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const employeeController = {};


// SELECT
employeeController.getemployee = async (req, res) => {
  const Employee = await employeeModel.find();
  res.json(Employee);
};

// INSERT
// controllers/employeeController.js
employeeController.createEmployee = async (req, res) => {
  try {
    const { name, password, age, gender, phone, email, rol } = req.body;

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    const newEmployee = new employeeModel({
      name,
      password,
      age,
      gender,
      phone,
      email,
      rol,
      imagen: imageUrl,
    });

    await newEmployee.save();
    res.json({ message: "Employee saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving employee" });
  }
};

// DELETE
employeeController.deleteEmployee = async (req, res) => {
  const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.id);
  if (!deletedEmployee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json({ message: "Employee Customers" });
};

//OBTENER POR ID
employeeController.getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//UPDATE

employeeController.updateEmployee = async (req, res) => {
  try {
    const { name, password, age, gender, phone, email, rol } = req.body;

    // Obtener empleado actual
    const employee = await employeeModel.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Empleado no encontrado" });

    let imageUrl = employee.imagen;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

    // Hashear password solo si viene y no está vacío
    let passwordHash = employee.password;
    if (password && password.trim() !== "") {
      passwordHash = await bcryptjs.hash(password, 10);
    }

    await employeeModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        password: passwordHash,
        age,
        gender,
        phone,
        email,
        rol,
        imagen: imageUrl,
      },
      { new: true }
    );

    res.json({ message: "Employee updated" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee" });
  }
};

export default employeeController;