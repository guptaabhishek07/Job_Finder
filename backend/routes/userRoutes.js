const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, applyJobByUser } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//user routes

// /api/allusers
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);
// /api/user/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// /api/admin/user/delete/id
router.delete('/user/delete/:user_id', isAuthenticated, isAdmin, deleteUser);
// /api/user/apply
router.post('/user/apply', isAuthenticated, applyJobByUser);




module.exports = router;