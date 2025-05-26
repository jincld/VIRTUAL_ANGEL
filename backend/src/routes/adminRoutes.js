import express from "express";
import { getAdminInfo } from "../controllers/adminController.js";
import validateAuthToken from "../middlewares/validateAuthToken.js";


const router = express.Router();

router.get("/profile", validateAuthToken(["admin"]), getAdminInfo);


export default router;
