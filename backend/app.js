// importar librerías
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// crear app 🔥 PRIMERO
const app = express();

// middlewares
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// importar rutas
import categoryRoutes from "./src/routes/category.js";
import contactRoutes from "./src/routes/contact.js";
import clientRoutes from "./src/routes/clients.js";
import employeeRoutes from "./src/routes/employee.js";
import productsRoutes from "./src/routes/products.js";
import orderRoutes from "./src/routes/order.js";
import assessmentRoutes from "./src/routes/assessment.js";
import registerEmployeesRoutes from "./src/routes/registerEmployee.js";
import registerClientsRoutes from "./src/routes/registerClients.js";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";

// rutas
app.use("/api/category", categoryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

// exportar la app para usarla en index.js
export default app;
