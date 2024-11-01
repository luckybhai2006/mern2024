import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null); // To store user data
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to track navbar toggle
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenChange = () => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    };

    handleTokenChange();
  }, [navigate]);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.userData); // Assuming the user data is returned here
        } else {
          console.error('Failed to fetch user data');
        }
      };

      fetchUserData();
    }
  }, [token]);

  // Toggle the navbar on mobile
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Close the navbar when clicking a link
  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const logoutAndRedirect = () => {
    localStorage.removeItem('token'); // Clear the token
    setToken(null); // Update the state
    setUser(null); // Clear user data
    navigate("/login"); // Navigate to login
    closeNavbar(); // Close the navbar after logging out
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">𝕋𝕖𝕔𝕙𝕟𝕚𝕔𝕒𝕝 𝔹𝕠𝕪𝕤</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} // Use custom toggle function
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeNavbar}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" onClick={closeNavbar}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>Contact</NavLink>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" onClick={logoutAndRedirect}>Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" onClick={closeNavbar}>Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={closeNavbar}>Login</NavLink>
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
