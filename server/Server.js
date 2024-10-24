const express = require("express");
const path = require("path");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const AdminRoute = require('./router/admin-router');
const connectdb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require("cors");

// CORS MIDDLEWARE
const corsOption = {
   // origin: "http://localhost:5173",
   origin: "*",
   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
   credentials: true,
};

app.use(cors(corsOption));

// MIDDLEWARE
app.use(express.json());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/contact', contactRoute);
app.use('/api/service', serviceRoute);
app.use('/api/admin', AdminRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Adjust the path to your build folder

// Catch-all route to serve index.html for all other routes
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')); // Adjust the path to your build folder
});

// Error middleware
app.use(errorMiddleware);

// Connect to the database and start the server
connectdb().then(() => {
   app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log('Server is running at port 5000');
   });
});
