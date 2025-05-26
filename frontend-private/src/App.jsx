import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../AuthToken.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import ClientNav from '../../frontend-public/src/components/Nav/nav.jsx';
import AdminNav from './components/Nav/Nav.jsx';

import { useEffect } from 'react';
import axios from 'axios';

// Rutas públicas
import Login from './pages/Login/Login.jsx';
import ForgotPass from '../../frontend-public/src/pages/ForgotPassword/Forgotpassword.jsx';
import VerifyCode from '../../frontend-public/src/pages/VerifyCode/VerifyCode.jsx';
import NewPassword from '../../frontend-public/src/pages/NewPassword/NewPassword.jsx';

import Contact from './pages/contact/Contact.jsx';


// Rutas protegidas
import Home from './pages/home.jsx';
import FirstUse from './pages/FirstUse/FirstUse.jsx';
import Inicio from './pages/inicio/inicio.jsx';
import Products from './pages/Products/Products.jsx';
import Shirts from '../../frontend-public/src/pages/shirts/Shirts.jsx';
import Pants from '../../frontend-public/src/pages/pants/Pants.jsx';
import Jacket from '../../frontend-public/src/pages/jackets/Jackets.jsx';
import Sweaters from '../../frontend-public/src/pages/sweaters/Sweaters.jsx';
import PantsDetail from './pages/ProductsView/PantsView/PantsDetailAdmin.jsx';
import ShirtsDetail from './pages/ProductsView/ShirtsView/ShirtsDetailAdmin.jsx';
import JacketsDetail from './pages/ProductsView/JacketsView/JacketsDetailAdmin.jsx';
import SweatersDetail from './pages/ProductsView/SweatersView/SweatersDetailAdmin.jsx';
import AddProduct from './pages/AddProduct/AddProduct.jsx';
import EditProduct from './pages/EditProduct/EditProduct.jsx';
import Employees from './pages/Employee/Employee.jsx';
import EditEmployee from './pages/Employee/EditEmployee.jsx';
import AddEmployee from './pages/Employee/addEmployee.jsx';
import Orders from './pages/orders/Orders';
import Sales from './pages/sales/Sales.jsx';
import SaleDetail from './pages/sales/SaleDetail.jsx';
import OrderDetail from './pages/orders/OrderDetail.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProfileAdmin from './pages/ProfileAdmin/ProfileAdmin.jsx';
import ProfileEmployee from './pages/ProfileEmployee/ProfileEmployee.jsx';

// 🔐 Protege rutas temporales como recuperación de contraseña
const PasswordProtectedRoute = ({ element, storageKey }) => {
  const hasAccess = sessionStorage.getItem(storageKey);
  return hasAccess ? element : <Navigate to="/forgotpassword" replace />;
};

// 📦 Axios para mantener cookies en todas las peticiones
axios.defaults.withCredentials = true;

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { userType, login, isLoading } = useAuth();

  // 🔁 Verificar la cookie al cargar la app
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/me'); // asegúrate de tener esta ruta
        if (res.data.userType) {
          login(res.data.userType); // actualiza contexto si cookie existe
        }
      } catch (err) {
        console.log("No session found:", err.response?.data?.message || err.message);
      }
    };

    fetchSession();
  }, [login]);

  // 🧭 Qué rutas no deben mostrar navbar/footer
  const hideLayoutRoutes = ['/', '/forgotpassword', '/verifycode', '/newpassword'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  const renderNav = () => {
    if (shouldHideLayout) return null;
    if (!userType) return null;
    if (userType === 'client') return <ClientNav />;
    if (userType === 'employee' || userType === 'admin') return <AdminNav />;
    return null;
  };

  if (isLoading) return null; // o puedes poner un spinner

  return (
    <>
      <ScrollToTop />
      {renderNav()}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPass />} />
            <Route path="verifycode" element={<PasswordProtectedRoute element={<VerifyCode />} storageKey="canAccessVerifyCode" />} />
            <Route path="newpassword" element={<PasswordProtectedRoute element={<NewPassword />} storageKey="canAccessNewPassword" />} />

            <Route path="contact" element={<Contact />} />


            {/* Rutas protegidas */}
            <Route path="startpage" element={<ProtectedRoute element={<Home />} allowedRoles={['admin', 'employee']} />} />
            <Route path="firstuse" element={<ProtectedRoute element={<FirstUse />} allowedRoles={['admin', 'employee']} />} />
            <Route path="inicio" element={<ProtectedRoute element={<Inicio />} allowedRoles={['admin', 'employee']} />} />
            <Route path="products" element={<ProtectedRoute element={<Products />} allowedRoles={['admin', 'employee']} />} />
            <Route path="employee" element={<ProtectedRoute element={<Employees />} allowedRoles={['admin']} />} />
            <Route path="/editemployee" element={<ProtectedRoute element={<EditEmployee />} allowedRoles={['admin']} />} />
            <Route path="/addemployee" element={<ProtectedRoute element={<AddEmployee />} allowedRoles={['admin']} />} />
            <Route path="orders" element={<ProtectedRoute element={<Orders />} allowedRoles={['admin', 'employee']} />} />
            <Route path="sales" element={<ProtectedRoute element={<Sales />} allowedRoles={['admin', 'employee']} />} />
            <Route path="shirts" element={<ProtectedRoute element={<Shirts />} allowedRoles={['admin', 'employee']} />} />
            <Route path="pants" element={<ProtectedRoute element={<Pants />} allowedRoles={['admin', 'employee']} />} />
            <Route path="jackets" element={<ProtectedRoute element={<Jacket />} allowedRoles={['admin', 'employee']} />} />
            <Route path="sweaters" element={<ProtectedRoute element={<Sweaters />} allowedRoles={['admin', 'employee']} />} />
            <Route path="shirts/:id" element={<ProtectedRoute element={<ShirtsDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="pants/:id" element={<ProtectedRoute element={<PantsDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="jackets/:id" element={<ProtectedRoute element={<JacketsDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="sweaters/:id" element={<ProtectedRoute element={<SweatersDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="/addproduct" element={<ProtectedRoute element={<AddProduct />} allowedRoles={['admin', 'employee']} />} />
            <Route path="editproduct/:id" element={<ProtectedRoute element={<EditProduct />} allowedRoles={['admin', 'employee']} />} />
            <Route path="editemployee/:id" element={<ProtectedRoute element={<EditEmployee />} allowedRoles={['admin', 'employee']} />}/>
            <Route path="sales/:id" element={<ProtectedRoute element={<SaleDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="orders/:id" element={<ProtectedRoute element={<OrderDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="profileadmin" element={<ProtectedRoute element={<ProfileAdmin />} allowedRoles={['admin']} />} />
            <Route path="profileemployee" element={<ProtectedRoute element={<ProfileEmployee />} allowedRoles={['employee']} />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
