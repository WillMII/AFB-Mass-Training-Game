const express = require('express');
const { registerUser, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;