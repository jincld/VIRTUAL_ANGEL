import express from "express";
import contactController from "../controllers/contactController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(contactController.getcontact)
  .post(contactController.createcontact);

router
  .route("/:id")
  .put(contactController.updatecontact)
  .delete(contactController.deletecontact);

export default router;