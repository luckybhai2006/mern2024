const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const AdminRoute = require('./router/admin-router');
const connectdb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require("cors");

// CORS MIDDLEWARE................lets tackel cors--->
const corsOption={
   // origin:"http://localhost:5173",
   origin:"*",
   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
   Credential:true,
}
app.use(cors(corsOption));
// MIDDLEWARE
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/auth', contactRoute);
app.use('/api/auth', serviceRoute);
app.use('/api/admin', AdminRoute);


app.use(errorMiddleware);

connectdb().then(() => {
   app.listen(5000,'0.0.0.0', () => {
      console.log('server is running at port 5000')
   });
});