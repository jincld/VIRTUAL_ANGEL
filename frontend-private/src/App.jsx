import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';  // This should be your Nav component
import FirstUse from './pages/firstUse/firstuse.jsx';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
      <Route path="/firstuse" element={<FirstUse />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

