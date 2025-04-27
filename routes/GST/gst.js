const express = require('express'); 
const { createGST, updateGST } = require('../../controllers/GST/gst');
const router = express.Router();

router.post('/create-gst', createGST); // Create a new GST entry
router.patch('/update-gst', updateGST); // Update the latest GST entry


module.exports = router