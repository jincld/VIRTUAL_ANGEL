import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/nav'; 
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
