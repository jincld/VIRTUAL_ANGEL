import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav.jsx'; 
import Home from './pages/home.jsx';
import Footer from './components/Footer/Footer.jsx'; 
import Contact from './pages/contact/Contact.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Login from './pages/Login/Login.jsx';
import ForgotPass from './pages/ForgotPassword/Forgotpassword.jsx';
import VerifyCode from './pages/VerifyCode/VerifyCode.jsx';
import NewPassword from './pages/NewPassword/NewPassword.jsx';
import CreateAccount from './pages/CreateAccount/CreateAccount.jsx';
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


function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/" element={<Login />} />
          <Route path="forgotpassword" element={<ForgotPass />} />
          <Route path="verifycode" element={<VerifyCode />} />
          <Route path="newpassword" element={<NewPassword />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="firstuse" element={<FirstUse />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="products" element={<Products />} />
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
