const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile, appliedJobsList } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');


//auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/me
router.get('/me', isAuthenticated, userProfile);    

// /api/me
router.get('/appliedJobsList', isAuthenticated, appliedJobsList); 

module.exports = router;