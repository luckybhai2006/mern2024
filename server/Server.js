const connectdb = require("./utils/db");
const express = require("express");
const path = require("path");
const app = express();

// Import your routes
const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// API routes
app.use('/api/auth', authRoute);
app.use('/api/contact', contactRoute);
app.use('/api/service', serviceRoute);
app.use('/api/admin', adminRoute);

// Catch-all handler for serving React app
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start server after connecting to the database
connectdb().then(() => {
   app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log('Server is running at port 5000');
   });
});
