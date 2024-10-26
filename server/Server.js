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

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// API routes
app.use('/api/auth', authRoute);
app.use('/api/auth', contactRoute); // Changed to /api/contact
app.use('/api/auth', serviceRoute); // Changed to /api/service
app.use('/api/admin', AdminRoute); // Kept the same

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Error middleware
app.use(errorMiddleware);

// Connect to the database and start the server
connectdb().then(() => {
   app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log('Server is running at port', process.env.PORT || 5000);
   });
}).catch(err => {
   console.error('Database connection failed:', err);
});
