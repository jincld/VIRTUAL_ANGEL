import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../../frontend-public/AuthToken.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import ClientNav from '../../frontend-public/src/components/Nav/nav.jsx';
import AdminNav from './components/Nav/Nav.jsx';

// Públicas
import Login from './pages/Login/Login.jsx';
import ForgotPass from '../../frontend-public/src/pages/ForgotPassword/Forgotpassword.jsx';
import VerifyCode from '../../frontend-public/src/pages/VerifyCode/VerifyCode.jsx';
import NewPassword from '../../frontend-public/src/pages/NewPassword/NewPassword.jsx';
import Home from './pages/home.jsx';
import Contact from './pages/contact/Contact.jsx';
import FirstUse from './pages/FirstUse/FirstUse.jsx';

// Protegidas
import Inicio from './pages/inicio/inicio.jsx';
import Products from './pages/Products/Products.jsx';
import Shirts from '../../frontend-public/src/pages/shirts/Shirts.jsx';
import Pants from '../../frontend-public/src/pages/pants/Pants.jsx';
import Jacket from '../../frontend-public/src/pages/jackets/Jackets.jsx';
import Sweaters from '../../frontend-public/src/pages/sweaters/Sweaters.jsx';
import PantsDetail from '../../frontend-public/src/pages/pants/PantsDetailAdmin.jsx';
import ShirtsDetail from '../../frontend-public/src/pages/shirts/ShirtsDetailAdmin.jsx';
import JacketsDetail from '../../frontend-public/src/pages/jackets/JacketsDetailAdmin.jsx';
import SweatersDetail from '../../frontend-public/src/pages/sweaters/SweatersDetailAdmin.jsx';
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
import PasswordProtectedRoutes from './components/PasswordProtectedRoute';

// Protege las rutas de recuperación de contraseña
const PasswordProtectedRoute = ({ element, storageKey }) => {
  const hasAccess = sessionStorage.getItem(storageKey);
  return hasAccess ? element : <Navigate to="/forgotpassword" replace />;
};

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { userType } = useAuth();

  const hideLayoutRoutes = ['/', '/forgotpassword', '/verifycode', '/newpassword'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  const renderNav = () => {
    if (shouldHideLayout) return null;
    if (!userType) return <Navigate to="/" />;
    if (userType === 'client') return <ClientNav />;
    if (userType === 'employee' || userType === 'admin') return <AdminNav />;
    return null;
  };

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
<Route
  path="verifycode"
  element={<PasswordProtectedRoute element={<VerifyCode />} storageKey="canAccessVerifyCode" />}
/>
<Route
  path="newpassword"
  element={<PasswordProtectedRoute element={<NewPassword />} storageKey="canAccessNewPassword" />}
/>
            <Route path="startpage" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="firstuse" element={<FirstUse />} />

            {/* Rutas protegidas */}
            <Route path="inicio" element={<ProtectedRoute element={<Inicio />} allowedRoles={['admin', 'employee']} />} />
            <Route path="products" element={<ProtectedRoute element={<Products />} allowedRoles={['admin', 'employee']} />} />
            <Route path="employee" element={<ProtectedRoute element={<Employees />} allowedRoles={['admin']} />} />
            <Route path="/editemployee" element={<ProtectedRoute element={<EditEmployee />} allowedRoles={['admin']} />} />
            <Route path="/addemployee" element={<ProtectedRoute element={<AddEmployee />} allowedRoles={['admin']} />} />
            <Route path="orders" element={<ProtectedRoute element={<Orders />} allowedRoles={['admin', 'employee']} />} />
            <Route path="sales" element={<ProtectedRoute element={<Sales />} allowedRoles={['admin']} />} />
            <Route path="shirts" element={<ProtectedRoute element={<Shirts />} allowedRoles={['admin', 'employee']} />} />
            <Route path="pants" element={<ProtectedRoute element={<Pants />} allowedRoles={['admin', 'employee']} />} />
            <Route path="jackets" element={<ProtectedRoute element={<Jacket />} allowedRoles={['admin', 'employee']} />} />
            <Route path="sweaters" element={<ProtectedRoute element={<Sweaters />} allowedRoles={['admin', 'employee']} />} />
            <Route path="shirts/:id" element={<ProtectedRoute element={<ShirtsDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="pants/:id" element={<ProtectedRoute element={<PantsDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="jackets/:id" element={<ProtectedRoute element={<JacketsDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="sweaters/:id" element={<ProtectedRoute element={<SweatersDetail />} allowedRoles={['admin', 'employee']} />} />
            <Route path="addproduct" element={<ProtectedRoute element={<AddProduct />} allowedRoles={['admin', 'employee']} />} />
            <Route path="editproduct" element={<ProtectedRoute element={<EditProduct />} allowedRoles={['admin', 'employee']} />} />
            <Route path="sales/:id" element={<ProtectedRoute element={<SaleDetail />} allowedRoles={['admin']} />} />
            <Route path="orders/:id" element={<ProtectedRoute element={<OrderDetail />} allowedRoles={['admin', 'employee']} />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
