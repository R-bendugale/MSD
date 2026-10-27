const User = require('../models/User');
const Item = require('../models/Item');
const Claim = require('../models/Claim');
const Notification = require('../models/Notification');

// @desc Get admin dashboard overview stats
// @route GET /api/admin/stats
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalLost = await Item.countDocuments({ type: 'Lost' });
    const totalFound = await Item.countDocuments({ type: 'Found' });
    const totalReturned = await Item.countDocuments({ status: 'Returned' });
    const pendingClaims = await Claim.countDocuments({ status: 'Pending' });

    // Category breakdown
    const categories = ['Mobile', 'Electronics', 'Backpack', 'Bag', 'Wallet', 'Books', 'Keys', 'Spectacles', 'ID Card', 'Others'];
    const categoryStats = await Promise.all(
      categories.map(async (cat) => {
        const count = await Item.countDocuments({ category: cat });
        return { category: cat, count };
      })
    );

    res.json({
      totalUsers,
      totalLost,
      totalFound,
      totalReturned,
      pendingClaims,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all registered users (Admin view)
// @route GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get notifications for user
// @route GET /api/admin/notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Mark notifications as read
// @route PUT /api/admin/notifications/read
const markNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, isRead: false }, { isRead: true });
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminStats,
  getUsers,
  getNotifications,
  markNotificationsRead
};
