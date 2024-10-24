const Service = require('../models/service_model');

const services = async (req, res) => {
   try {
      const response = await Service.find();
      if(!response){
         res.status(404).json({ message: "No service found" })
         return;
      }
      res.status(200).json({ message: response })
      console.log("dervice data getting from database")
   } catch (error) {s
      return res.status(500).json(`services---------> ${error}`)
   }
};
module.exports = services;