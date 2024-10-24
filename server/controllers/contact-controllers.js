const contact = require('../models/contact_model');

const contactForm = async (req, res) => {
   try {
      const response = req.body
      await contact.create(response);
      return res.status(200).json({ message: "message send succesfuly" })
   } catch (error) {
      return res.status(500).json({ message: "message not delivered" })
   }
};
module.exports = contactForm;