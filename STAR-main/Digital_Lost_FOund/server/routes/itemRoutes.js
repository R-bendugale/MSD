const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  getMyItems,
  updateItemStatus,
  deleteItem
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getItems);
router.get('/my-items', protect, getMyItems);
router.get('/:id', getItemById);
router.post('/', protect, upload.single('image'), createItem);
router.put('/:id/status', protect, updateItemStatus);
router.delete('/:id', protect, deleteItem);

module.exports = router;
