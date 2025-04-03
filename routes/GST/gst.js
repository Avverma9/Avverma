const express = require('express'); 
const router = require('../travel/car');

router.post('/create-gst', createGST); // Create a new GST entry
router.patch('/update-gst', updateGST); // Update the latest GST entry
router.post('/apply-gst', applyGST); // Apply GST to a given price

module.exports = router