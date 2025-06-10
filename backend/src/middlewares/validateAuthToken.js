import jsonwebtoken from 'jsonwebtoken';
import { config } from "../config.js";

export const validateAuthToken = (allowedUserTypes = []) => {
  return (req, res, next) => {
    try {
      const { authToken } = req.cookies;

      if (!authToken) {
        return res.status(401).json({ message: "Cookies not found, please login first" });
      }

      const decoded = jsonwebtoken.verify(authToken, config.JWT.secret);
      req.user = decoded; // Añadimos el usuario decodificado al request

      // Aquí deberías asegurarte de que tu token contiene el id del cliente en el payload
      // Por ejemplo, asumimos que el token tiene un campo "id" o "idCustomer"
      if (!decoded.id) {
        return res.status(403).json({ message: "User ID missing in token" });
      }

      // Si quieres filtrar por tipos de usuario, puedes usar el siguiente código
      if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(decoded.userType)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Continuar con el middleware añadiendo el idCustomer
      req.user.idCustomer = decoded.id;  // Si el id está en `decoded.id`, lo asignamos a `req.user.idCustomer`
      next();
    } catch (error) {
      console.log("Token validation error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default validateAuthToken;
