// authRoutes.js
const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/authController');

const authController = new AuthController();
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
