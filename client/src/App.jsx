import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {

  return (
    <Router>
       <div className="topWrapper">
       <Navbar></Navbar>
       <div className="pages">
        <Routes>
          <Route path = "/" element = {<Home></Home>}></Route>
          <Route path = "/about" element = {<About></About>}></Route>
        </Routes>
       </div>
      </div> 
      </Router>
    
  )
}

export default App
