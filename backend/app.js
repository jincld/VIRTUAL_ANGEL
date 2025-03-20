//importar todo de la librería de express
import express from "express";
import categoryRoutes from "./src/routes/category.js";
import contactRoutes from "./src/routes/contact.js";
import customerRoutes from "./src/routes/customer.js";
import employeeRoutes from "./src/routes/employee.js";
import productsRoutes from "./src/routes/products.js";
import orderRoutes from "./src/routes/order.js";
import assessmentRoutes from "./src/routes/assessment.js";
//crear constante que es igual a la libreria que importé y se ejecuta
const app = express();

//usar un archivo json
app.use (express.json());

//rutas para crud
app.use("/api/category", categoryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/assessment", assessmentRoutes);
//importo esta constante para usar express en todos lados
export default app;