import EmployeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) =>{
    const{name, password, age, gender, phone, email, rol} = req.body;

    try{
        //verificar si el empleado ya existe
        const existEmployee = await EmployeeModel.findOne({email})
        if(existEmployee) {
            return res.json({message: "El empleado ya existe"})
        }

        //Encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardar el nuevo empleado
        const newEmployee = new EmployeeModel ({name, password: passwordHash, age, gender, phone, email, rol})

        await newEmployee.save();

        //TOKEN!!!!!!!!!

        jsonwebtoken.sign(
            //Qué voy a guardar
            {id: newEmployee._id},
            //Cuál es el secreto
            config.JWT.secret,
            //Cuándo expira
            {expiresIn: config.JWT.expiresIn},
            //Función flecha
            (error, token) => {
                if(error) console.log(error)
                    res.cookie("authToken", token)
                res.json({message: "Empleado registrado"})
            }
        )
    
    } catch (error) {
        console.log(error)
    }
};

export default registerEmployeesController;