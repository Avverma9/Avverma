const express = require('express');
const router = express.Router();
const { upload } = require('../../aws/upload');
const DashboardUser = require('../../controllers/dashboardUser');
const auth = require('../../authentication/auth');

router.post('/create/dashboard/user', upload, DashboardUser.registerUser);
router.put('/update/dashboard/user-status/:id', auth, DashboardUser.updateStatus);
router.post('/login/dashboard/user', DashboardUser.loginUser);
router.get('/login/dashboard/get/all/user', auth, DashboardUser.getPartners);
router.get('/login/dashboard/get/all/user/:id', auth, DashboardUser.getPartnersById);

router.delete('/delete/dashboard/delete/partner/:id', auth, DashboardUser.deletePartner);
router.patch('/update/dashboard/updated/partner/:id', upload, auth, DashboardUser.updatePartner);
router.post('/api/users/:id/menu-items', auth, DashboardUser.addMenu);
router.patch('/api/users/:id/menu-items', auth, DashboardUser.deleteMenu);

module.exports = router;
