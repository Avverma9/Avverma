const express = require('express');
const router = express.Router();
const { upload } = require('../aws/upload');
const userController = require('../controllers/user');
const auth = require('../authentication/auth');

router.post('/Signup', upload, userController.createSignup);
router.get('/get/:userId', userController.getUserById);
router.get('/get/user/by/query', userController.findUser);
router.post('/signIn', userController.signIn);
router.post('/signIn/google', userController.GoogleSignIn);
router.put('/update', upload, userController.update);
router.get('/get/all-users-data/all-data', userController.getAllUsers);
router.get('/get-total/user-details', userController.totalUser); // user count
router.get('/get-user-data/in-bulk', userController.getAllUserBulkById)

module.exports = router;
