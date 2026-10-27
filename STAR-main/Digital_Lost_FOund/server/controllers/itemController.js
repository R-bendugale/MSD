const Item = require('../models/Item');

// @desc Get all items with optional filters
// @route GET /api/items
const getItems = async (req, res) => {
  try {
    const { type, category, status, search } = req.query;
    let query = {};

    if (type) query.type = type;
    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 }).populate('reportedBy', 'name email department');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single item by ID
// @route GET /api/items/:id
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('reportedBy', 'name email department rollNo batch');
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new item report (Lost or Found)
// @route POST /api/items
const createItem = async (req, res) => {
  try {
    const { title, category, type, description, location, date, reporterName, reporterEmail } = req.body;
    
    let imageUrl = req.body.image || '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const item = await Item.create({
      title,
      category,
      type,
      description,
      location,
      date: date || Date.now(),
      image: imageUrl,
      status: type === 'Lost' ? 'Lost' : 'Found',
      reportedBy: req.user ? req.user.id : '60d0fe4f5311236168a109ca',
      reporterName,
      reporterEmail
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get items reported by current user
// @route GET /api/items/my-items
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update item status
// @route PUT /api/items/:id/status
const updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await Item.findById(req.params.id);
    
    if (item) {
      item.status = status;
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete item
// @route DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Item removed successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  getMyItems,
  updateItemStatus,
  deleteItem
};
