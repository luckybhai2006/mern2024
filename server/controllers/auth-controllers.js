const User = require('../models/user_model');
// const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require('path');

const home = async (req, res) => {
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
      console.log("Request Body:", req.body);
      const { username, email, phone, password } = req.body;

      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ msg: "Email already exists" });
      }

      // Create a new user without handling profile image
      const userCreated = await User.create({
         username,
         email,
         phone,
         password,
         // Remove profileImage from user creation
      });

      res.status(201).json({
         msg: "Registration successful",
         token: await userCreated.generateAuthToken(),
         userId: userCreated._id.toString()
      });
   } catch (error) {
      console.log("Error in Registration:", error);
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
      } else {
         res.status(401).json({ message: "Invalid Password" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
   }
};

// *--------------------------------
// * To send user data -> User logic
// *--------------------------------

const user = async (req, res) => {
   try {
      const userData = req.user;
      console.log(userData);
      res.status(200).json({ userData });
   } catch (error) {
      console.log(`Error from the User route ${error}`);
      res.status(500).json("Internal Server Error");
   }
}

module.exports = { home, register, login, user };
