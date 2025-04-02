const employeeController = {};
import employeeModel from "../models/employee.js";

// SELECT
employeeController.getemployee = async (req, res) => {
  const Employee = await employeeModel.find();
  res.json(Employee);
};

// INSERT
employeeController.createEmployee = async (req, res) => {
  const { name, password, age, gender, phone, email, rol } = req.body;
  const newEmployee = new employeeModel({ name, password, age, gender, phone, email, rol });
  await newEmployee.save();
  res.json({ message: "Employee saved" });
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
  // Solicito todos los valores
  const { name, password, age, gender, phone, email, rol } = req.body;
  // Actualizo
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      password,
      age,
      gender,
      phone,
      email, 
      rol
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Employee updated" });
};

export default employeeController;