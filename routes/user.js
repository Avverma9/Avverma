const express = require('express');
const router = express.Router();
const { upload } = require('../aws/upload');
const userController = require('../controllers/user');
const userJWT = require('../authentication/userJwt');
const adminJWT = require('../authentication/adminJwt');

router.post('/Signup', upload, userController.createSignup);
router.get('/get/:userId', userController.getUserById);
router.post('/signIn', userController.signIn);
router.post('/signIn/google', userController.GoogleSignIn);
router.put('/update', upload, userJWT, userController.update);
router.get('/get/all-users-data/all-data', adminJWT, userController.getAllUsers);
router.get('/get-total/user-details', adminJWT, userController.totalUser); // user count

module.exports = router;
