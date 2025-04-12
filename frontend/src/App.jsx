import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Nav from './components/Nav/nav'; 
import Home from './pages/home.jsx'
import Footer from './components/Footer/Footer.jsx'; 
import About from './pages/about/About.jsx';
import Terms from './pages/terms/Terms.jsx';

function App() {

  return (
    <>
    <Router>
    <Nav/>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
    </Routes>
    <Footer/>
    </Router>
    </>
  )
}

export default App
