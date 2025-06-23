import ClientModel from "../models/clients.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import { sendVerificationEmail } from '../utils/mailer.js';  // Importa tu función de email

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  const { name, password, age, gender, cardNumber, address, phone, email } = req.body;

  try {
    const existClient = await ClientModel.findOne({ email });
    if (existClient) {
      return res.status(400).json({ message: "Client already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    // Generar token de verificación para email
    const verificationToken = jsonwebtoken.sign(
      { email },
      config.JWT.secret,
      { expiresIn: '1d' }  // o el tiempo que quieras
    );

    const newClient = new ClientModel({
      name,
      password: passwordHash,
      age,
      gender,
      cardNumber,
      address,
      phone,
      email,
      rol: 'client',
      verified: false,
      verificationToken // Guardar el token para luego verificarlo
    });

    await newClient.save();

    // Enviar email de verificación
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: "Client registered, please check your email to verify your account." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering client" });
  }
};


export default registerClientsController;
