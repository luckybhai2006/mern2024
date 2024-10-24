const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/auth-controllers');
const signupSchema = require('../validators/auth-validator')
const validate = require('../middlewares/validate-middlevares')
const authMiddleware = require('../middlewares/auth-middlewares')

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router; 