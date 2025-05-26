import express from "express";
import multer from "multer";
import registerEmployeesController from "../controllers/registerEmployeeController.js";

const router = express.Router();
const upload = multer({dest: "public/"})

router.route("/").post(upload.single("imagen"), registerEmployeesController.register)

export default router;