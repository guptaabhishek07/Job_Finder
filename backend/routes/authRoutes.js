const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const { signup , signin, logout, userProfile} = require('../controller/authController');
const { isAuthenticated } = require('../middleware/auth');

//auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/user profile
router.get('/mee',isAuthenticated, userProfile);


module.exports = router;