import clientModel from "../models/clients.js";
import employeeModel from "../models/employee.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("🔐 Intento de login:", email);

    try {
        // Verificar si es admin
        if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
            console.log("➡️ Usuario admin");
            const token = jsonwebtoken.sign(
                { id: "admin", userType: "admin" },
                config.JWT.secret,
                { expiresIn: config.JWT.expiresIn }
            );

            res.cookie("authToken", token, {
                httpOnly: true,
                sameSite: "Lax",
                secure: process.env.NODE_ENV === "production", // Solo en producción
                maxAge: 60 * 60 * 1000 // 1 hora
            });
            return res.json({ message: "Login successful", userType: "admin" });
        }

        // Buscar simultáneamente en employee y client
        const [employeeFound, clientFound] = await Promise.all([
            employeeModel.findOne({ email }),
            clientModel.findOne({ email })
        ]);

        // Detección de conflicto
        if (employeeFound && clientFound) {
            console.log("⚠️ Conflicto: email duplicado en ambos modelos");
            return res.status(409).json({
                message: "Email exists as both employee and client. Contact support."
            });
        }

        let userFound = null;
        let userType = null;

        if (employeeFound) {
            console.log("🔍 Encontrado como EMPLOYEE");
            userFound = employeeFound;
            userType = userFound.rol || "employee";
        } else if (clientFound) {
            console.log("🔍 Encontrado como CLIENT");
            userFound = clientFound;
            userType = userFound.rol || "client";
        }

        if (!userFound) {
            console.log("❌ Usuario no encontrado");
            return res.status(404).json({ message: "User not found" });
        }

        // Validar contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            console.log("❌ Contraseña incorrecta");
            return res.status(401).json({ message: "Wrong credentials" });
        }

        // Generar token
        const token = jsonwebtoken.sign(
            { id: userFound._id, userType },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production", // Solo en producción
            maxAge: 60 * 60 * 1000 // 1 hora
        });
        console.log("✅ Login exitoso:", userType);

        res.json({ message: "Login successful", userType });

    } catch (error) {
        console.log("❌ Error general:", error);
        res.status(500).json({ message: "Backend error" });
    }
};

export default loginController;
