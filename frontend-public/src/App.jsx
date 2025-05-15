import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import ClientNav from './components/Nav/nav.jsx';
import { AuthProvider, useAuth } from '../../frontend-public/AuthToken.jsx';

// Pages (cliente)
import Home from './pages/home.jsx';
import About from './pages/about/About.jsx';
import Terms from './pages/terms/Terms.jsx';
import Contact from './pages/contact/Contact.jsx';
import Clothing from './pages/clothing/Clothing.jsx';
import Shirts from './pages/shirts/Shirts.jsx';
import Pants from './pages/pants/Pants.jsx';
import Jacket from './pages/jackets/Jackets.jsx';
import Sweaters from './pages/sweaters/Sweaters.jsx';
import PantsDetail from './pages/pants/PantsDetail.jsx';
import ShirtsDetail from './pages/shirts/ShirtsDetail.jsx';
import JacketsDetail from './pages/jackets/JacketsDetail.jsx';
import SweatersDetail from './pages/sweaters/SweatersDetail.jsx';
import News from './pages/news/New.jsx';
import SearchPage from './pages/Search/Search.jsx';
import Lookbook from './pages/Lookbook/Lookbook.jsx';
import CartPage from './pages/Cart/CartPage';
import CheckoutForm from './pages/Cart/CheckoutForm';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Auth Pages */}
            <Route path="/" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPass />} />
            <Route path="verifycode" element={<VerifyCode />} />
            <Route path="newpassword" element={<NewPassword />} />
            <Route path="createaccount" element={<CreateAccount />} />

            {/* Client Pages */}
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="terms" element={<Terms />} />
            <Route path="contact" element={<Contact />} />
            <Route path="clothing" element={<Clothing />} />
            <Route path="shirts" element={<Shirts />} />
            <Route path="pants" element={<Pants />} />
            <Route path="jackets" element={<Jacket />} />
            <Route path="sweaters" element={<Sweaters />} />
            <Route path="shirts/:id" element={<ShirtsDetail />} />
            <Route path="pants/:id" element={<PantsDetail />} />
            <Route path="jackets/:id" element={<JacketsDetail />} />
            <Route path="sweaters/:id" element={<SweatersDetail />} />
            <Route path="news" element={<News />} />
            <Route path="searchpage" element={<SearchPage />} />
            <Route path="lookbook" element={<Lookbook />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutForm />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
