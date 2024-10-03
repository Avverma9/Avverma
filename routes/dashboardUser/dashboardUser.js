const express = require('express');
const router = express.Router();
const { upload } = require('../../aws/upload');
const DashboardUser = require('../../controllers/dashboardUser');
const adminJWT = require('../../authentication/adminJwt');

router.post('/create/dashboard/user', upload, DashboardUser.registerUser);
router.put('/update/dashboard/user-status/:id', adminJWT, DashboardUser.updateStatus);
router.post('/login/dashboard/user', DashboardUser.loginUser);
router.get('/login/dashboard/get/all/user', adminJWT, DashboardUser.getPartners);
router.get('/login/dashboard/get/all/user/:id', adminJWT, DashboardUser.getPartnersById);

router.delete('/delete/dashboard/delete/partner/:id', adminJWT, DashboardUser.deletePartner);
router.patch('/update/dashboard/updated/partner/:id', upload, adminJWT, DashboardUser.updatePartner);
router.post('/api/users/:id/menu-items', adminJWT, DashboardUser.addMenu);
router.patch('/api/users/:id/menu-items', adminJWT, DashboardUser.deleteMenu);

module.exports = router;
