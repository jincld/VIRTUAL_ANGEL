import express from "express";
import customersController from "../controllers/customersController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(customersController.getcontact)
  .post(customersController.createcontact);

router
  .route("/:id")
  .put(customersController.updatecontact)
  .delete(customersController.deletecontact);

export default router;