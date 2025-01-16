const express = require('express');
const { upload } = require('../../aws/upload');
const { addOwner, getOwnerById, getOwner, updateOwner, deleteOwner } = require('../../controllers/travel/carsOwner');
const router = express.Router();

router.post('/add-an-owner', upload, addOwner);
router.get('/get-all-owner', getOwner);
router.post('/get-an-owner/:id', getOwnerById);
router.delete('/delete-an-owner/:id', deleteOwner);
router.patch('/update-an-owner/:id', upload, updateOwner);

module.exports = router;
