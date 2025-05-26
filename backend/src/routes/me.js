import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jsonwebtoken.verify(authToken, config.JWT.secret);

    // ⚠️ Asegúrate que el token incluya userId y userType al generarlo en login
    return res.json({
      userType: decoded.userType,
      userId: decoded.id, // <-- Agregar esta línea
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
