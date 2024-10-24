const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const userschema = mongoose.Schema({
   username: {
      type: String,
      requird: true
   },
   email: {
      type: String,
      requird: true
   },
   phone: {
      type: String,
      requird: true
   },
   password: {
      type: String,
      requird: true
   },
   isAdmin: {
      type: Boolean,
      default: false
   },
});
// COMPARE PASSWORD
userschema.methods.comparePass = async function (password) {
   return bcrypt.compare(password, this.password)
};

// SECURE THE PASSWORD WITH BCRYPT
userschema.pre('save', async function (next) {

   const user = this;
   if (!user.isModified("password")) {
      next();
   }
   try {
      const saltround = await bcrypt.genSalt(10);
      const hash_pass = await bcrypt.hash(user.password, saltround);
      user.password = hash_pass;
   } catch (error) {
      next(error)
   }
});

// JSON WEB TOKEN
userschema.methods.generateAuthToken = async function () {
   try {
      return jwt.sign({
         userId: this._id.toString(),
         email: this.email,
         isAdmin: this.isAdmin,
      },
         process.env.KEY_ACCES, {
         expiresIn: "30d"
      }
      )
   } catch (error) {
      console.log(error);
   }
}


// DEFINE THE MODEL OR THE COLLECTION NAME
const User = new mongoose.model('user', userschema);

module.exports = User;












