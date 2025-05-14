import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/nav'; 
import Home from './pages/home.jsx';
import Footer from './components/Footer/Footer.jsx'; 
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
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import SearchPage from './pages/Search/Search.jsx';
import Lookbook from './pages/Lookbook/Lookbook.jsx';
import CartPage from './pages/Cart/CartPage';
import CheckoutForm from './pages/Cart/CheckoutForm';
import NewCollection from './pages/NewCollection/NewCollection.jsx';
import Login from '../../frontend-public/src/pages/Login/Login.jsx';
import ForgotPass from './pages/ForgotPassword/Forgotpassword.jsx';
import VerifyCode from './pages/VerifyCode/VerifyCode.jsx';
import NewPassword from './pages/NewPassword/NewPassword.jsx';
import CreateAccount from './pages/CreateAccount/CreateAccount.jsx';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Nav />
        <Routes>
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
          <Route path="/" element={<Login />} />
          <Route path="forgotpassword" element={<ForgotPass />} />
          <Route path="verifycode" element={<VerifyCode />} />
          <Route path="newpassword" element={<NewPassword />} />
          <Route path="createaccount" element={<CreateAccount />} />

          {/* Estas son las rutas de NewCollection */}
          <Route path="newcollection" element={<NewCollection />} />
          <Route path="newcollection/:collectionName" element={<NewCollection />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
