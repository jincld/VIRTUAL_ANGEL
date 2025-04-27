import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Nav from './components/Nav/nav'; 
import Home from './pages/home.jsx'
import Footer from './components/Footer/Footer.jsx'; 
import About from './pages/about/About.jsx';
import Terms from './pages/terms/Terms.jsx';
import Contact from './pages/contact/Contact.jsx';
import Clothing from './pages/clothing/Clothing.jsx';
import Shirts from './pages/shirts/Shirts.jsx';
import News from './pages/news/New.jsx';

function App() {

  return (
    <>
    <Router>
    <Nav/>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="shirts" element={<Shirts />} />
          <Route path="news" element={<News />} />
    </Routes>
    <Footer/>
    </Router>
    </>
  )
}

export default App
