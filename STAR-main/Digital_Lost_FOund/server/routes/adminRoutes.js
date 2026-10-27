const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getUsers,
  getNotifications,
  markNotificationsRead
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, getAdminStats);
router.get('/users', protect, adminOnly, getUsers);
router.get('/notifications', protect, getNotifications);
router.put('/notifications/read', protect, markNotificationsRead);

module.exports = router;
