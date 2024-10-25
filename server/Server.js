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

// Serve static files from the frontend's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// API routes
app.use('/api/auth', authRoute);
app.use('/api/contact', contactRoute);
app.use('/api/auth', serviceRoute);
app.use('/api/admin', AdminRoute);

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
});
