import express from "express";
import assessmentController from "../controllers/assessmentController.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js";  // Asegúrate de que el middleware esté importado

// Router() nos ayuda a colocar los métodos que tendrá mi ruta
const router = express.Router();

// Ruta para obtener todas las reseñas y agregar una nueva reseña
router
  .route("/")
  .get(assessmentController.getAssessment)
  .post(validateAuthToken(), assessmentController.insertAssessment); // Protege la ruta con validateAuthToken()

// Ruta para obtener reseñas por producto, actualizar y eliminar reseñas
router
  .route("/:id")
  .get(assessmentController.getAssessmentByProduct)  // Obtener reseñas por producto
  .put(validateAuthToken(), assessmentController.updateAssessment)  // Protege la ruta de actualización
  .delete(validateAuthToken(), assessmentController.deleteAssessment);  // Protege la ruta de eliminación

export default router;
