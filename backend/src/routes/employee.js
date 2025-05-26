import express from "express";
import multer from "multer";
import employeeController from "../controllers/employeeController.js";

const router = express.Router();

const upload = multer({dest: "public/"})

router
  .route("/")
  .get(employeeController.getemployee)
  .post(upload.single("imagen"), employeeController.createEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployeeById)   // <--- agregar esta línea
  .put(upload.single("imagen"), employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);


export default router;