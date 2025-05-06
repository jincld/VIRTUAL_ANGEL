import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';  // This should be your Nav component
import Footer from './components/Footer/Footer.jsx'; 
import FirstUse from './pages/firstUse/firstuse.jsx';
import Login from './pages/Login/Login.jsx';

function App() {
  return (
    <>
        <Router>
      <Nav />
      <Routes>
      <Route path="/firstuse" element={<FirstUse />} />
      <Route path="/" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;

