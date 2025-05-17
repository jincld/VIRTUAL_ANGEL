import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Home from './pages/home.jsx';
import Contact from './pages/contact/Contact.jsx';
import Login from './pages/Login/Login.jsx';
import ForgotPass from '../../frontend-public/src/pages/ForgotPassword/Forgotpassword.jsx';
import VerifyCode from '../../frontend-public/src/pages/VerifyCode/VerifyCode.jsx';
import NewPassword from '../../frontend-public/src/pages/NewPassword/NewPassword.jsx';
import CreateAccount from '../../frontend-public/src/pages/CreateAccount/CreateAccount.jsx';
import FirstUse from './pages/FirstUse/FirstUse.jsx';
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

import ClientNav from '../../frontend-public/src/components/Nav/nav.jsx';
import AdminNav from './components/Nav/Nav.jsx';
import { useAuth, AuthProvider } from '../../frontend-public/AuthToken.jsx'; // <-- este es el fix importante ✅

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { userType } = useAuth();

  const hideLayoutRoutes = [
    '/', '/forgotpassword', '/verifycode', '/newpassword', '/createaccount'
  ];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  const renderNav = () => {
    if (shouldHideLayout) return null;

    if (!userType) {
      return <Navigate to="/" />;
    }

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
            <Route path="startpage" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPass />} />
            <Route path="verifycode" element={<VerifyCode />} />
            <Route path="newpassword" element={<NewPassword />} />
            <Route path="createaccount" element={<CreateAccount />} />
            <Route path="firstuse" element={<FirstUse />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="products" element={<Products />} />
            <Route path="employee" element={<Employees />} />
            <Route path="/editemployee" element={<EditEmployee />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sales" element={<Sales />} />
            <Route path="shirts" element={<Shirts />} />
            <Route path="pants" element={<Pants />} />
            <Route path="jackets" element={<Jacket />} />
            <Route path="sweaters" element={<Sweaters />} />
            <Route path="shirts/:id" element={<ShirtsDetail />} />
            <Route path="pants/:id" element={<PantsDetail />} />
            <Route path="jackets/:id" element={<JacketsDetail />} />
            <Route path="sweaters/:id" element={<SweatersDetail />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="editproduct" element={<EditProduct />} />
            <Route path="sales/:id" element={<SaleDetail />} />
            <Route path="orders/:id" element={<OrderDetail />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
