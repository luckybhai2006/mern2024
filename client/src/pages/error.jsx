import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './ErrorPage.css'; // Import custom CSS

const ErrorPage = ({ errorCode = "404", message = "Oops! Page Not Found" }) => {
  return (
    <div className="container text-center mt-5">
      {/* <div className="row justify-content-center"> */}
        <div className="col-md-6 col-lg-9" style={{height:'100%',width:"100%",border:"3px solid red"}}>
          <div className="card error-card p-4">
            <div className="card-body">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s" 
                alt="Error" 
                className="img-fluid mb-4" 
              />
              <h1 className="display-1 error-code">{errorCode}</h1>
              <h2 className="display-4 error-message">{message}</h2>
              <p className="lead">
                It seems the page you are looking for does not exist or has been moved.
              </p>
              <Link to="/" className="btn btn-primary btn-lg mt-4">
                Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ErrorPage;
