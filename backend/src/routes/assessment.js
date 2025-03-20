import express from "express";
import assessmentController from "../controllers/assessmentController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(assessmentController.getAssessment)
  .post(assessmentController.insertAssessment);

router
  .route("/:id")
  .put(assessmentController.updateAssessment)
  .delete(assessmentController.deleteAssessment);

export default router;