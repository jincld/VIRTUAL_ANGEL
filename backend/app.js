//importar todo de la librería de express
import express from "express";
//crear constante que es igual a la libreria que importé y se ejecuta
const app = express();

//usar un archivo json
app.use (express.json());

//rutas para crud

//importo esta constante para usar express en todos lados
export default app;