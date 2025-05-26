import jsonwebtoken from 'jsonwebtoken';
import {config} from "../config.js";

export const validateAuthToken = (allowedUserTypes = []) => {
  return (req, res, next) => {
    try {
      const { authToken } = req.cookies;

      if (!authToken) {
        return res.status(401).json({ message: "Cookies not found, please login first" });
      }

      const decoded = jsonwebtoken.verify(authToken, config.JWT.secret);
      req.user = decoded; // <-- añade esto para que el controller sepa quién eres

      if (!allowedUserTypes.includes(decoded.userType)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      console.log("Token validation error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};


export default validateAuthToken;