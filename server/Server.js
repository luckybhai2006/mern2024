const express = require("express");
const path = require("path");
const cors = require("cors");
const connectdb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

// Import routes
const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const AdminRoute = require('./router/admin-router');

const app = express();

// CORS Middleware
const corsOptions = {
   origin: "*", // Change to a specific origin in production
   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
   credentials: true,
};
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
app.use(express.json());

// API routes
app.use('/api/auth', authRoute);
<<<<<<< HEAD
app.use('/api/auth', contactRoute); // Changed to /api/contact
app.use('/api/auth', serviceRoute); // Changed to /api/service
app.use('/api/admin', AdminRoute); // Kept the same
=======
app.use('/api/auth', contactRoute);  // Updated to unique paths
app.use('/api/auth', serviceRoute);  // Updated to unique paths
app.use('/api/admin', AdminRoute);
>>>>>>> aea0185d560e3eb15fa403e0729c5d29d11c77e2

// Error middleware
app.use(errorMiddleware);

// Connect to the database
connectdb().then(() => {
<<<<<<< HEAD
   app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log('Server is running at port', process.env.PORT || 5000);
   });
}).catch(err => {
   console.error('Database connection failed:', err);
=======
   console.log('Connected to the database');
>>>>>>> aea0185d560e3eb15fa403e0729c5d29d11c77e2
});

// Export the app (for Vercel)
module.exports = app;
