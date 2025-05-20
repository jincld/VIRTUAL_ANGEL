import jsonwebtoken from 'jsonwebtoken';
import {config} from "../config.js";

export const validateAuthToken = (allowedUserTypes = [])=>{
    return (req, res, next)=>{
        try {
            //1 extraer el token de la cookie
            const {authToken} = req.cookies;

            //2 validar existebcia de cookies

            if(!authToken){
                return res.json({message: "Cookies not found, please login first"})
            }

            //3 extraer información del token
            const decoded = jsonwebtoken.verify(authToken, config.JWT.secret)

            //verificar si el tipo de usuario puede ingresar o no
            if(!allowedUserTypes.includes(decoded.userType)){
                return res.json({message: "Access denied"})
            }

            next();
        } catch (error) {
            console.log("error" + error)
        }
    };
};

export default validateAuthToken;