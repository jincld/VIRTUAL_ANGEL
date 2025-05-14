//Importar tablas de users
import clientModel from "../models/customers.js";
import employeeModel from "../models/employee.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("🔐 Intento de login:", email, password); // 👈

    try {
        let userFound;
        let userType;

        if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
            userType = "admin";
            userFound = { _id: "admin" };
            console.log("➡️ Usuario admin");
        } else {
            userFound = await employeeModel.findOne({ email });
            userType = "employee";

            if (!userFound) {
                userFound = await clientModel.findOne({ email });
                userType = "client";
            }
        }

        if (!userFound) {
            console.log("❌ Usuario no encontrado");
            return res.json({ message: "User not found" });
        }

        if (userType !== "admin") {
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
                console.log("❌ Contraseña incorrecta");
                return res.json({ message: "Contraseña incorrecta" });
            }
        }

        jsonwebtoken.sign(
            { id: userFound._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) {
                    console.log("❌ Error generando token:", error);
                    return res.json({ message: "Error al generar token" });
                }

                console.log("✅ Login exitoso:", userType);
                res.cookie("authToken", token, {
                    httpOnly: true,
                    sameSite: "Lax",
                    // secure: true  // sólo si usas HTTPS
                });
                res.json({ message: "Login successful" });
            }
        );
    } catch (error) {
        console.log("❌ Error general:", error);
        res.json({ message: "Error interno" });
    }
};

 export default loginController;