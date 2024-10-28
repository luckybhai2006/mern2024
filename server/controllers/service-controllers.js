const Service = require('../models/service_model');

// Get all services
const getAllServices = async (req, res) => {
   try {
      const response = await Service.find();
      if (!response || response.length === 0) {
         return res.status(404).json({ message: "No services found" });
      }
      res.status(200).json({ message: response });
      console.log("Service data retrieved from database");
   } catch (error) {
      return res.status(500).json({ error: `Error fetching services: ${error}` });
   }
};

// Add a new service
const addService = async (req, res) => {
   const { service, description, price, provider } = req.body;
   try {
      const newService = new Service({ service, description, price, provider });
      await newService.save();
      res.status(201).json({ message: 'Service added successfully', service: newService });
   } catch (error) {
      return res.status(500).json({ error: `Error adding service: ${error}` });
   }
};

// Update an existing service by ID
const updateService = async (req, res) => {
   const { id } = req.params;
   const { service, description, price, provider } = req.body;
   try {
      const updatedService = await Service.findByIdAndUpdate(
         id,
         { service, description, price, provider },
         { new: true, runValidators: true } // runValidators ensures that the data is validated before saving
      );
      if (!updatedService) {
         return res.status(404).json({ error: 'Service not found' });
      }
      res.status(200).json({ message: 'Service updated successfully', service: updatedService });
   } catch (error) {
      return res.status(500).json({ error: `Error updating service: ${error}` });
   }
};

// Delete a service by ID
const deleteService = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedService = await Service.findByIdAndDelete(id);
      if (!deletedService) {
         return res.status(404).json({ error: 'Service not found' });
      }
      res.status(200).json({ message: 'Service deleted successfully' });
   } catch (error) {
      return res.status(500).json({ error: `Error deleting service: ${error}` });
   }
};
// Get a individual service page by ID
const getServiceById = async (req, res) => {
   const { id } = req.params; // Extract the ID from the request parameters
   try {
      const service = await Service.findById(id);
      if (!service) {
         return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json(service);
   } catch (error) {
      return res.status(500).json({ error: `Error fetching service: ${error}` });
   }
};


module.exports = {
   getAllServices,
   addService,
   updateService,
   deleteService,
   getServiceById,
};
