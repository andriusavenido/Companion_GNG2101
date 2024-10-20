import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Accessibility from './pages/Accessibility/Accessibility';
import History from './pages/History/History';
import Login from './pages/Login/Login';

function App() {

  return (
    <Router>
       <div className="topWrapper">
       <Navbar></Navbar>
       <div className="pages">
        <Routes>
          <Route path = "/" element = {<Home/>}></Route>
          <Route path = "/about" element = {<About/>}></Route>
          <Route path = "/history" element = {<History/>}></Route>
          <Route path = "/accessibility" element = {<Accessibility/>}></Route>
          <Route path = "/login" element = {<Login/>}></Route>
        </Routes>
       </div>
      </div> 
      </Router>
    
  )
}

export default App
