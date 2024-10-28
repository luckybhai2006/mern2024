// src/components/AccessService.jsx
import { Link } from 'react-router-dom';

import React from 'react';

const AccessService = () => {
  return (
    <div className="container" style={{ marginTop: '80px', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#61dafb', fontSize: '2.5rem', marginBottom: '20px' }}>
        Welcome Back to Our Services!
      </h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: 'auto', lineHeight: '1.6' }}>
        As a registered and logged-in user, you now have full access to all the exclusive services we offer.
        We are committed to providing you with the best experience possible. Whether you're here to explore
        new features or need support, we’re here to help you every step of the way.
      </p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '30px', color: '#333' }}>
        Need Assistance?
      </p>
      <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: 'auto', lineHeight: '1.6' }}>
        If you have any questions or need further assistance, please do not hesitate to reach out. Our dedicated team
        is available to support you.
      </p>
      <p style={{ fontSize: '1.75rem', color: '#61dafb', marginTop: '20px' }}>
        Phone: <a href="tel:+9198997336770" style={{ color: '#61dafb', textDecoration: 'underline' }}>+91 989-973-3670</a>
      </p>
      <Link to="/" className="btn btn-primary btn-lg mt-4">
              Go Back to Home
            </Link>
    </div>

  );
};

export default AccessService;
