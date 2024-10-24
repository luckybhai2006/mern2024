// const mongoos = require("mongoose");
const mongoos = require("mongoose");

const URI = "mongodb+srv://pandeylalit147:UTTRAKHAND2006@cluster0.rfryhq7.mongodb.net/mern_data?retryWrites=true&w=majority&appName=Cluster0";
mongoos.connect(URI);

const connectdb = async() => {
   try{
      await mongoos.connect(URI);
      console.log("connection sucesfull to database")
   }catch(error){
      console.log("database connection failed");
      process.exit(0)
   }
};
module.exports = connectdb;