import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Accessibility from './pages/Accessibility/Accessibility';
import History from './pages/History/History';
import Login from './pages/Login/Login';
import RequireLogin from './pages/Redirects/RequireLogin';
import Page404 from './pages/Redirects/Page404';
import { useAuthContext } from './context/AuthContext';

function App() {
  //protect routes using auth context
  const {user} = useAuthContext();


  return (
    <Router basename ="/Companion_GNG2101">
       <div className="topWrapper">
       <Navbar></Navbar>
       <div className="pages">
        <Routes>
          <Route path = "/" element = {<Home/>}></Route>
          <Route path = "/about" element = {<About/>}></Route>
          <Route path = "/history" element = {user? <History/>:<RequireLogin/>}></Route>
          <Route path = "/accessibility" element = {<Accessibility/>}></Route>
          <Route path = "/login" element = {<Login/>}></Route>
          <Route path="*" element={<Page404/>} />
        </Routes>
       </div>
      </div> 
      </Router>
    
  )
}

export default App
