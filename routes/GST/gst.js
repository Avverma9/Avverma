const express = require('express'); 
const { createGST, updateGST, getGST, getAllGST } = require('../../controllers/GST/gst');
const router = express.Router();

router.post('/create-gst', createGST); // Create a new GST entry
router.patch('/update-gst', updateGST); // Update the latest GST entry
router.get('/get-single-gst', getGST); // Get a single GST entry
router.get('/get-all-gst', getAllGST); // Get all GST entries
module.exports = router