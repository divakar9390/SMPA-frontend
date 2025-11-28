import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context_api'; // adjust the path if needed
import icon from './icn.jpg';

function Navbar() {
  const { isLoggedIn } = useAuth(); // ✅ using auth context

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-sm-top" style={{
    backgroundColor: "black",
    backdropFilter: "blur(6px)",
    padding: "20px 50px",
    position: "relative",
    zIndex: 1000,
    color:"purple"
    
  }}>
        <div className="container-fluid">
          
          <img src={icon} alt="logo" style={{ width: "60px", height: "60px" }} /> 
          
          <Link className="navbar-brand  fs-3 fw-bold" style={{ fontSize: "30px",color:'purple' }} >
            SMPA
          </Link>

          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav me-auto">
              <Link className="nav-link  fs-4 fw-bold mx-3" to="/" style={{color:'purple'}}>Home</Link>
            </div>

            <div className="navbar-nav ms-auto">
              <Link className="nav-link  fs-4 fw-bold mx-3" to="/about" style={{color:'purple'}}>About</Link>
            
              <Link className="nav-link  fs-4 fw-bold mx-3" to="/contact" style={{color:'purple'}}>Contact</Link>

              {!isLoggedIn && (
                <>
                  <Link className="nav-link  fs-4 fw-bold mx-3" to="/login" style={{color:'purple'}}>Login</Link>
                  <Link className="nav-link  fs-4 fw-bold mx-3" to="/signin" style={{color:'purple'}}>Signup</Link>
                </>
              )}

              {isLoggedIn && (
                <>
                <Link className="nav-link  fs-4 fw-bold mx-3" to="/logout" style={{color:'purple'}}>Logout</Link>
                <Link className="nav-link  fs-4 fw-bold mx-3" to="/analyze" style={{color:'purple'}}>Analyze</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
