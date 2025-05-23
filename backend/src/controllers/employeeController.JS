const employeeController = {};
import employeeModel from "../models/employee.js";

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

// UPDATE
employeeController.updateEmployee = async (req, res) => {
  try {
    const { name, password, age, gender, phone, email, rol } = req.body;

    // Obtener empleado actual
    const employee = await employeeModel.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Empleado no encontrado" });

    let imageUrl = employee.imagen; // imagen actual

    // Si se sube nueva imagen, subirla a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;

      // Si deseas, puedes eliminar la imagen anterior de Cloudinary aquí,
      // pero necesitas guardar el `public_id` para hacerlo.
    }

    // Actualizar el empleado
    await employeeModel.findByIdAndUpdate(req.params.id, {
      name,
      password,
      age,
      gender,
      phone,
      email,
      rol,
      imagen: imageUrl,
    });

    res.json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    console.log("Error al actualizar empleado:", error);
    res.status(500).json({ message: "Error al actualizar empleado" });
  }
};

export default employeeController;