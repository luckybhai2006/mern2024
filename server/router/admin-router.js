const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middlewares")
const {getAllUsers,getAllContact,deleteUserById,getUserById,updateUserById,deleteContactById} = require('../controllers/admin-controllers');
const adminMiddleware = require('../middlewares/admin-middleware');

//  authMiddleware => compare token
//  adminMiddleware => compare isAdmin is true or false

router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers);
router.route("/contact").get(authMiddleware,adminMiddleware,getAllContact);
router.route("/users/:id").get(authMiddleware,adminMiddleware,getUserById);
router.route("/users/update:id").patch(authMiddleware,adminMiddleware,updateUserById);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,deleteContactById);


module.exports = router; 

