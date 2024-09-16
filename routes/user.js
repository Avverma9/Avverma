const express = require("express");
const router = express.Router();
const { upload } = require("../aws/upload");
const userController = require("../controllers/user");

router.post("/Signup", upload, userController.createSignup);
router.get("/get/:userId", userController.getUserById);
router.post("/signIn", userController.signIn);
router.post("/signIn/google", userController.GoogleSignIn);
router.put("/update", upload, userController.update);
router.get("/get/all-users-data/all-data", userController.getAllUsers);
router.get("/get-total/user-details", userController.totalUser); // user count

module.exports = router;
