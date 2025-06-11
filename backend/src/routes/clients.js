import express from "express";
import customersController from "../controllers/customersController.js";

// Router para manejar las rutas relacionadas con clientes
const router = express.Router();

// Rutas para obtener todos los clientes y crear nuevos
router
  .route("/")
  .get(customersController.getCustomers)
  .post(customersController.createCustomers);

// Ruta para obtener, actualizar o eliminar un cliente específico por su ID
router
  .route("/:id")
  .get(customersController.getCustomerID)  // Obtener un cliente por ID
  .put(customersController.updateCustomers)  // Actualizar un cliente
  .delete(customersController.deleteCustomers);  // Eliminar un cliente

export default router;
