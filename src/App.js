import React from 'react';
import Navbar from "./components/Navbar";
import Registration from './components/Registration';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Login from './components/Login';
import Contact from './components/Contact';
import Logout from './components/Logout';
import { useAuth } from './Context_api';
import Home from './Home';
import About from './About';
import Scanner from "./components/Scanner"


function App() {
  const { isLoggedIn } = useAuth();

  return (
   <div
  style={{
    backgroundImage: `url('/background.jpg')`,  // make sure the image is in public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }}
>
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/analyze' element={<Scanner />} />

      <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to='/analyze' />} />
      <Route path='/signin' element={!isLoggedIn ? <Registration /> : <Navigate to='/' />} />
      <Route path='/logout' element={isLoggedIn ? <Logout /> : <Navigate to='/' />} />
    </Routes>
  </Router>
</div>
  );
}

export default App;
