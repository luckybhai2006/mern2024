import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenChange = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    };

    handleTokenChange();
  }, [navigate]);

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    const bootstrapCollapse = new window.bootstrap.Collapse(navbarCollapse);
    bootstrapCollapse.hide();
  };

  const logoutAndRedirect = () => {
    localStorage.removeItem('token'); // Clear the token
    setToken(null); // Update the state
    navigate("/login"); // Navigate to login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">𝕋𝕖𝕔𝕙𝕟𝕚𝕔𝕒𝕝 𝔹𝕠𝕪𝕤</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handleNavLinkClick}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={handleNavLinkClick}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" onClick={handleNavLinkClick}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={handleNavLinkClick}>Contact</NavLink>
            </li>

            {token ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={logoutAndRedirect}>Logout</NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" onClick={handleNavLinkClick}>Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={handleNavLinkClick}>Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
