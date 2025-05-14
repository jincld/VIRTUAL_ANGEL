// importar librerías
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// crear app 🔥 PRIMERO
const app = express();

// middlewares
app.use(cors({
  origin: "http://localhost:5173", // dominio del frontend
  credentials: true                // importante para cookies
}));
app.use(express.json());
app.use(cookieParser());

// importar rutas
import categoryRoutes from "./src/routes/category.js";
import contactRoutes from "./src/routes/contact.js";
import customerRoutes from "./src/routes/customer.js";
import employeeRoutes from "./src/routes/employee.js";
import productsRoutes from "./src/routes/products.js";
import orderRoutes from "./src/routes/order.js";
import assessmentRoutes from "./src/routes/assessment.js";
import registerEmployeesRoutes from "./src/routes/registerEmployee.js";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";

// rutas
app.use("/api/category", categoryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

// exportar la app para usarla en index.js
export default app;
