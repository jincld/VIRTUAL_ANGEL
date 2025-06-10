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


app.use(cookieParser());


app.use(express.json({ limit: '40mb' })); // Aumentar el límite según sea necesario
app.use(express.urlencoded({ limit: '40mb', extended: true })); // Para formularios con archivos

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
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
import validateAuthToken from "./src/middlewares/validateAuthToken.js"
import meRoute from './src/routes/me.js';
import adminRoutes from "./src/routes/adminRoutes.js";
import dashboardRoutes from './src/routes/dashboardRoutes.js';

// rutas
app.use("/api/category", validateAuthToken(["admin"]), categoryRoutes);
app.use("/api/contact", validateAuthToken(["employee", "admin", "client"]), contactRoutes);
app.use("/api/clients", validateAuthToken(["employee", "admin"]), clientRoutes);
app.use("/api/employee", validateAuthToken(["employee", "admin"]), employeeRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/order", validateAuthToken(["employee", "admin"]), orderRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/registerEmployees", validateAuthToken(["admin"]), registerEmployeesRoutes);
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/admin", validateAuthToken(["admin"]), adminRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);
app.use("/api/me", meRoute);
app.use("/api/dashboard", dashboardRoutes);


// exportar la app para usarla en index.js
export default app;
