//importar libreria mongoose
import mongoose from "mongoose";
//importo mi archivo config con las variables
import {config} from "./src/config.js";

//conecto la base de datos
//mongoose.connect(config.MONGO_URI);
mongoose.connect(config.db.URI);

//comprobar que funcione
//crear constante que es igual a la conexión
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected");
});

connection.on("disconnected", () => {
    console.log("DB is disconnected");
});

connection.on("error", (error) => {
    console.log("Error found" + error);
});