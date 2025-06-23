const customersController = {};
import clientsModel from "../models/clients.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/mailer.js';
import mongoose from 'mongoose';
import { config } from "../config.js";

// Obtener un cliente por su ID
customersController.getCustomerID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const customer = await clientsModel.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    return res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

// SELECT
customersController.getCustomers = async (req, res) => {
  const Customers = await clientsModel.find();
  res.json(Customers);
};

// INSERT VIEJO ESTE NO FUNCIONA
customersController.createCustomers = async (req, res) => {
  console.log("📥 [createCustomers] Se recibió solicitud de registro");

  try {
    const { name, password, age, gender, cardNumber, address, phone, email } = req.body;
    console.log("📧 Email recibido en body:", email);

    const existing = await clientsModel.findOne({ email });
    if (existing) {
      console.log("⚠️ Email ya registrado:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, config.JWT.secret, { expiresIn: '1d' });

    const newCustomer = new clientsModel({
      name,
      password: hashedPassword,
      age,
      gender,
      cardNumber,
      address,
      phone,
      email,
      verificationToken: token,
      verified: false,
    });

    await newCustomer.save();

    console.log("📤 Llamando a sendVerificationEmail");
    await sendVerificationEmail(email, token);

    console.log("✅ Registro exitoso para:", email);
    res.status(201).json({ message: "Account created, check your email to verify." });

  } catch (error) {
    console.error("❌ Error creando cuenta:", error);
    res.status(500).json({ message: "Error creating account" });
  }
};


// VERIFY EMAIL
customersController.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) return res.status(400).json({ message: "Missing token" });

    // Verificar token (usa la MISMA clave secreta del .env o config.js)
    const decoded = jwt.verify(token, config.JWT.secret);

    // Buscar al cliente por email y token
    const user = await clientsModel.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      // Si no encontró usuario con ese token (puede ser token inválido o ya usado)
      // Ahora buscamos si el usuario ya está verificado para mostrar mensaje adecuado
      const userVerified = await clientsModel.findOne({ email: decoded.email, verified: true });

      if (userVerified) {
        // Usuario ya verificado, redirigimos con alreadyVerified=true
        return res.redirect("http://localhost:5173/login?alreadyVerified=true");
      }

      // Caso general token inválido o expirado
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Actualizar verificación
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirigir al login con verified=true
    return res.redirect("http://localhost:5173/login?verified=true");

  } catch (err) {
    console.error("❌ Verification error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};


// DELETE
customersController.deleteCustomers = async (req, res) => {
  const deletedcustomers = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "Customers not found" });
  }
  res.json({ message: "deleted Customers" });
};

// UPDATE
customersController.updateCustomers = async (req, res) => {
  try {
    const { name, password, age, gender, cardNumber, address, phone, email, verified } = req.body;

    // Si la contraseña ha cambiado, ciframos la nueva contraseña
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);  // Se cifra la contraseña con 10 rondas
    }

    // Actualizamos el cliente en la base de datos
    await clientsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        password: hashedPassword,  // Guardamos la contraseña cifrada
        age,
        gender,
        cardNumber,
        address,
        phone,
        email,
        verified
      },
      { new: true }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

export default customersController;