const express = require('express');
const router = express.Router();
const { getAllServices, addService, updateService, deleteService, getServiceById } = require('../controllers/service-controllers');

// GET all services
router.get('/service', getAllServices);

// POST a new service
router.post('/service', addService);

// PUT (update) an existing service by ID
router.put('/service/:id', updateService);

// DELETE a service by ID
router.delete('/service/:id', deleteService);

// Route to get service by ID
router.get('/servic/:id', getServiceById); 
module.exports = router;
