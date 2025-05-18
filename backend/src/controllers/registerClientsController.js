import ClientModel from "../models/clients.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
    const { name, password, age, gender, cardNumber, address, phone, email } = req.body;

    try {
        const existClient = await ClientModel.findOne({ email });
        if (existClient) {
            return res.json({ message: "Client already exists" });
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newClient = new ClientModel({
            name,
            password: passwordHash,
            age,
            gender,
            cardNumber,
            address,
            phone,
            email,
            rol: 'client' // ✅ siempre agregar rol en el modelo
        });

        await newClient.save();

        jsonwebtoken.sign(
            { id: newClient._id, userType: 'client' }, // ✅ incluir userType en el token
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) console.log(error);
                res.cookie("authToken", token);
                res.json({ message: "Client registered", userType: 'client' }); // ✅ asegurarse que siempre devuelves userType
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar cliente" });
    }
};

export default registerClientsController;
