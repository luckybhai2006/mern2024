const { Schema, model } = require('mongoose');


const contactSchema = new Schema({
   username: {
      type: String,
      requird: true
   },
   email: {
      type: String,
      requird: true
   },
   message:{
      type: String,
      requird: true}
      
   });

// create a model or a collection
const contact = new model('contact', contactSchema);
module.exports = contact;



