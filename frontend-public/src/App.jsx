import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import ClientNav from './components/Nav/nav.jsx';
import { AuthProvider, useAuth } from '../../frontend-public/AuthToken.jsx';
import { Toaster } from "react-hot-toast";


// Importamos el CartProvider desde el nuevo archivo creado
import { CartProvider } from './context/CartContext'; // Importa correctamente CartContext

// Pages
import Home from './pages/home.jsx';
import About from './pages/about/About.jsx';
import Terms from './pages/terms/Terms.jsx';
import Contact from './pages/contact/Contact.jsx';
import Clothing from './pages/clothing/Clothing.jsx';
import Shirts from './pages/shirts/Shirts.jsx';
import Pants from './pages/pants/Pants.jsx';
import Jacket from './pages/jackets/Jackets.jsx';
import Sweaters from './pages/sweaters/Sweaters.jsx';
import ShirtsDetail from './pages/shirts/ShirtsDetail.jsx';
import PantsDetail from './pages/pants/PantsDetail.jsx';
import JacketsDetail from './pages/jackets/JacketsDetail.jsx';
import SweatersDetail from './pages/sweaters/SweatersDetail.jsx';
import News from './pages/news/New.jsx';
import SearchPage from './pages/Search/Search.jsx';
import Lookbook from './pages/Lookbook/Lookbook.jsx';
import CartPage from './pages/Cart/CartPage';
import CheckoutForm from './pages/Cart/CheckoutForm';
import ProfileClient from './pages/ProfileClient/ProfileClient.jsx';

// Auth Pages
import Login from './pages/Login/Login.jsx';
import ForgotPass from './pages/ForgotPassword/Forgotpassword.jsx';
import VerifyCode from './pages/VerifyCode/VerifyCode.jsx';
import NewPassword from './pages/NewPassword/NewPassword.jsx';
import CreateAccount from './pages/CreateAccount/CreateAccount.jsx';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { userType } = useAuth();

  const hideLayoutRoutes = ['/', '/forgotpassword', '/verifycode', '/newpassword', '/createaccount'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  const renderNav = () => {
    if (shouldHideLayout) return null;
    if (userType === 'client') return <ClientNav />;
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

const ProtectedRoute = ({ element, storageKey, redirectTo = "/" }) => {
  const hasAccess = sessionStorage.getItem(storageKey);
  return hasAccess ? element : <Navigate to="/forgotpassword" replace />;
};

const ProtectedClientRoute = ({ element }) => {
  const { userType } = useAuth();

  if (userType === 'client') {
    return element;
  }

  // Redirigir al login si no es cliente
  return <Navigate to="/" replace />;
};


function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Asegúrate de envolver toda la aplicación con el CartProvider */}
        <Router>
        <Toaster
  position="top-right"
  reverseOrder={false}
  containerStyle={{
    marginTop: '120px'
  }}
  toastOptions={{
    style: {
      background: '#111',
      color: '#ff0000',
      fontSize: '16px',
      zIndex: 99999,
    },
  }}
/>

          <LayoutWrapper>
            <Routes>
              {/* Auth Pages */}
              <Route path="/" element={<Login />} />
              <Route path="forgotpassword" element={<ForgotPass />} />
              <Route path="verifycode" element={
                <ProtectedRoute element={<VerifyCode />} storageKey="canAccessVerifyCode" />
              } />
              <Route path="newpassword" element={
                <ProtectedRoute element={<NewPassword />} storageKey="canAccessNewPassword" />
              } />
              <Route path="createaccount" element={<CreateAccount />} />

              {/* Cliente Pages */}
<Route path="home" element={<ProtectedClientRoute element={<Home />} />} />
<Route path="about" element={<ProtectedClientRoute element={<About />} />} />
<Route path="terms" element={<ProtectedClientRoute element={<Terms />} />} />
<Route path="contact" element={<ProtectedClientRoute element={<Contact />} />} />
<Route path="clothing" element={<ProtectedClientRoute element={<Clothing />} />} />
<Route path="shirts" element={<ProtectedClientRoute element={<Shirts />} />} />
<Route path="pants" element={<ProtectedClientRoute element={<Pants />} />} />
<Route path="jackets" element={<ProtectedClientRoute element={<Jacket />} />} />
<Route path="sweaters" element={<ProtectedClientRoute element={<Sweaters />} />} />
<Route path="shirts/:id" element={<ProtectedClientRoute element={<ShirtsDetail />} />} />
<Route path="pants/:id" element={<ProtectedClientRoute element={<PantsDetail />} />} />
<Route path="jackets/:id" element={<ProtectedClientRoute element={<JacketsDetail />} />} />
<Route path="sweaters/:id" element={<ProtectedClientRoute element={<SweatersDetail />} />} />
<Route path="news" element={<ProtectedClientRoute element={<News />} />} />
<Route path="searchpage" element={<ProtectedClientRoute element={<SearchPage />} />} />
<Route path="lookbook" element={<ProtectedClientRoute element={<Lookbook />} />} />
<Route path="cart" element={<ProtectedClientRoute element={<CartPage />} />} />
<Route path="checkout" element={<ProtectedClientRoute element={<CheckoutForm />} />} />
<Route path="profileclient" element={<ProtectedClientRoute element={<ProfileClient />} />} />



            </Routes>

          </LayoutWrapper>
        </Router>
      </CartProvider> 
    </AuthProvider>
  );
}

export default App;
