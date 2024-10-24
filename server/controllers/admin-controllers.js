const User = require('../models/user_model')
const Contact = require('../models/contact_model');

const getAllUsers = async(req,res) => {
try {
   const users = await User.find({},{password:0});
   console.log(users)
   if (!users || users.length === 0) {
      return res.status(404).json({message:"no user found"})
   };
   res.status(200).json(users);
} catch (error) {
   next(error)
}
}

// get all contact data

const getAllContact = async(req,res) => {
   try {
      const contact = await Contact.find({},{password:0});
      console.log(contact)
      if (!contact || contact.length === 0) {
         return res.status(404).json({message:"no user found"})
      };
      res.status(200).json(contact);
   } catch (error) {
      next(error)
   }
   }

// Single user data
   const getUserById=async(req,res)=>{

      try {
         const id = req.params.id;
         const data = await User.findOne({_id : id},{password:0});
         return res.status(200).json(data);
   
      } catch (error) {
         next(error);
      }
   }

   // Update user by id
   const updateUserById=async(req,res)=>{

      try {
         const id = req.params.id;
         const updateUserdata =req.body  ;
         
         const updateData = await User.updateOne({_id:id},{
            $set:updateUserdata
         });
         return res.status(200).json({updateData})
   
      } catch (error) {
         next(error);
      }
   }

   // Delete user by id
   const deleteUserById=async(req,res)=>{

      try {
         const id = req.params.id;
         await User.deleteOne({_id : id});
         return res.status(200).json({message:"Deleted by user Id"})
   
      } catch (error) {
         next(error);
      }
   }
   // Delete contact by id
   const deleteContactById =async(req,res)=>{

      try {
         const id = req.params.id;
         await Contact.deleteOne({_id : id});
         return res.status(200).json({message:"Contact delete"})
   
      } catch (error) {
         next(error);
      }
   }

   module.exports = {getAllUsers, getAllContact, deleteUserById, getUserById,updateUserById, deleteContactById};