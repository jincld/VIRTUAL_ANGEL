// src/routes/me.js
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
    return res.json({ userType: decoded.userType });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
