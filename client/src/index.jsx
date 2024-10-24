import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure you have an App.js file in the same directory
import './index.css'; // Optional: If you have global CSS styles

// Create a root for rendering your app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
