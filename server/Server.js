const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

// Import routes
const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const AdminRoute = require('./router/admin-router');
const connectdb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

// CORS MIDDLEWARE
const corsOptions = {
   origin: "*",
   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
   credentials: true,
};
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
app.use(express.json());

// API routes
app.use('/api/auth', authRoute);
app.use('/api/auth', contactRoute);  // Updated to unique paths
app.use('/api/auth', serviceRoute);  // Updated to unique paths
app.use('/api/admin', AdminRoute);

// Error middleware
app.use(errorMiddleware);

// Connect to the database
connectdb().then(() => {
   console.log('Connected to the database');
});

// Export the app (for Vercel)
module.exports = app;
