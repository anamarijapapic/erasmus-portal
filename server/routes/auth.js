var express = require('express');
const {
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', login);

router.post('/forgot-password/', forgotPassword);

router.post('/reset-password/:userID/:token', resetPassword);

module.exports = router;
