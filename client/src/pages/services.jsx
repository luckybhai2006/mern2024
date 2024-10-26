import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

const cardStyle = `
  .card10 {
    width: 100%;
    // margin: 10px;
    height: 100%;
    border: 3px solid #61dafb; /* Initial border color */
    border-radius:20px;
    color:white;s
    font-weight: bold;
    transition: transform 0.3s ease, border 0.3s ease;
  }
  .card10:hover {
    transform: scale(1.05);
    border: 4px solid white; /* Border color on hover */
  }
`;

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await fetch("https://mern2024-ui.onrender.com/api/auth/service", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data.message);
          setServices(data.message);
        } else {
          console.log('Failed to fetch service data');
        }
      } catch (error) {
        console.log(`Services front-end error: ${error}`);
      }
    };
    getService();
  }, []);

  return (
    <>
    <style>{cardStyle}</style>
      <div className="container">
        <div className="row">
          {services.map((currELm, index) => {
            const { description, price, provider, service } = currELm;

            return (
              <div className="col-md-4" key={index} style={{ marginBottom: '60px' }}>
                <div className="card10">
                  <img src="/images/design.png" className="card-img-top" alt="Card image" />
                  <div className="card-body">
                    <h5 className="card-title">{service}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">Price: {price}</p>
                    <p className="card-text">Provided by: {provider}</p>
                    <div className="btn btn-group">
                      <a href="/*"><button className="btn" style={{ background: "#61dafb", color: "black", fontWeight: "700",marginBottom:'20px' }}>Go Somewhere</button></a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;
