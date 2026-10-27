const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  claimerName: { type: String, required: true },
  claimerEmail: { type: String, required: true },
  proofDetails: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  adminNotes: { type: String, default: '' },
  claimDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);
