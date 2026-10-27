const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Mobile', 'Electronics', 'Backpack', 'Bag', 'Wallet', 'Books', 'Keys', 'Spectacles', 'ID Card', 'Others'] 
  },
  type: { type: String, required: true, enum: ['Lost', 'Found'] },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String, default: '' },
  status: { type: String, enum: ['Lost', 'Found', 'Pending Claim', 'Returned'], default: 'Lost' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reporterName: { type: String },
  reporterEmail: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
