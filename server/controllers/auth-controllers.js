const User = require('../models/user_model');
// const bcrypt = require("bcryptjs");

const home = async (req, res) => {
   // this code send data to localhost:5000/api/auth/
   try {
      res.status(200).send("Welcome to registration page using authcontrollers ...");
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
};

// -----> REGISTRATION LOGIC <----- //

const register = async (req, res) => {
   try {
      console.log(req.body);
      const { username, email, phone, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ msg: "Email already exists" });
      }

      const userCreated = await User.create({
         username,
         email,
         phone,
         password
      });

      res.status(201).json({
         msg: "registration succesfull",
         token: await userCreated.generateAuthToken(),
         userId: userCreated._id.toString()
      });

   } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
   }
};

// -----> LOGIN LOGIC <----- //

const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ msg: "Invalid Email" });
      }

      // const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = await user.comparePass(password);

      if (isMatch) {
         return res.status(200).json({
            msg: "Login successful",
            token: await user.generateAuthToken(),
            userId: user._id.toString()
         });
      }else{
         res.status(401).json({ message:"Inavalid Password"})
      }
   } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
   }
};

// *--------------------------------
// * To send user data -> User logic
// *--------------------------------

const user = async(req, res) => {
   try {
      const userData = req.user
      console.log(userData)
      res.status(200).json({userData});
   } catch (error) {
      console.log(`Error from the User route ${error}`);
   }
}

module.exports = { home, register, login, user };
