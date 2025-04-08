import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Nav from './components/Nav/nav'; 
import Home from './pages/home.jsx'

function App() {

  return (
    <>
    <Router>
    <Nav/>
    <Routes>
          <Route path="/" element={<Home />} />
    </Routes>
    </Router>
    </>
  )
}

export default App
