import app from "./app.js";
import "./database.js"; // Aquí va la conexión si tienes (puede estar vacío)
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function main() {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

main();
