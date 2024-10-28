import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const cardStyle = `
  .card10 {
    width: 100%;
    height: 100%;
    border: 3px solid #61dafb;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    transition: transform 0.3s ease, border 0.3s ease;
  }
  .card10:hover {
    transform: scale(1.01);
    border: 4px solid white;
  }
    .card-body{ 
    text-align: center;
    }
`;

const Services = () => {
  const [services, setServices] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/service`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setServices(data.message);
        } else {
          console.log('Failed to fetch service data');
        }
      } catch (error) {
        console.log(`Services front-end error: ${error}`);
      }
    };

    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    getService();
  }, []);

  const handleServiceClick = (serviceId) => {
    if (!isAuthenticated) {
      setShowPopup(true);
    } else {
      navigate(`/service/${serviceId}`);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <style>{cardStyle}</style>
      <div className="container">
        <div className="row">
          {services.map((currELm, index) => {
            const { description, price, provider, service, _id } = currELm;

            return (
              <div className="col-md-4" key={index} style={{ marginBottom: '40px' }}>
                <div className="card10">
                  <img src="/images/design.png" className="card-img-top" alt="Card image" />
                  <div className="card-body">
                    <h5 className="card-title">{service}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">Price: {price}</p>
                    <p className="card-text">Provided by: {provider}</p>
                    <div className="btn btn-group">
                      <button
                        className="btn"
                        style={{ background: "#61dafb", color: "black", fontWeight: "700", marginBottom: '20px' }}
                        onClick={() => handleServiceClick(_id)}
                      >
                        {isAuthenticated ? "Get Service" : "Register or Login to Access"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup for unauthenticated users */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              position: 'relative',
              padding: '50px',
              border: '3px solid #61dafb',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333',
              }}
              onClick={closePopup}
            >
              &times;
            </span>
            <h4 style={{ color: 'blue', fontSize: '30px' }}>ᴘʟᴇᴀꜱᴇ ʀᴇɢɪꜱᴛᴇʀ ᴏʀ ʟᴏɢɪɴ ꜰɪʀꜱᴛ</h4>
            <a href="#register" style={{ marginRight: '10px' }} className="btn btn-secondary">Register</a>
            <a href="#login" className="btn btn-secondary">Login</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
