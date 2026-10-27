const Claim = require('../models/Claim');
const Item = require('../models/Item');
const Notification = require('../models/Notification');

// @desc Submit a new claim for an item
// @route POST /api/claims
const createClaim = async (req, res) => {
  try {
    const { itemId, proofDetails, claimerName, claimerEmail } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user already claimed this item
    const existingClaim = await Claim.findOne({ item: itemId, claimedBy: req.user.id });
    if (existingClaim) {
      return res.status(400).json({ message: 'You have already submitted a claim request for this item' });
    }

    const claim = await Claim.create({
      item: itemId,
      claimedBy: req.user.id,
      claimerName: claimerName || req.user.name || 'Student',
      claimerEmail: claimerEmail || req.user.email,
      proofDetails,
      status: 'Pending'
    });

    // Update item status to Pending Claim
    item.status = 'Pending Claim';
    await item.save();

    // Create notification for user
    await Notification.create({
      user: req.user.id,
      message: `Your claim request for "${item.title}" has been submitted for admin verification.`,
      type: 'info'
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all claim requests (Admin view)
// @route GET /api/claims
const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate('item')
      .populate('claimedBy', 'name email department rollNo batch')
      .sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get current user's claim requests
// @route GET /api/claims/my-claims
const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimedBy: req.user.id })
      .populate('item')
      .sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Process claim (Approve / Reject) by Admin
// @route PUT /api/claims/:id/status
const processClaimStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body; // status: 'Approved' | 'Rejected'
    const claim = await Claim.findById(req.params.id).populate('item');

    if (!claim) {
      return res.status(404).json({ message: 'Claim request not found' });
    }

    claim.status = status;
    if (adminNotes) claim.adminNotes = adminNotes;
    await claim.save();

    const item = await Item.findById(claim.item._id || claim.item);
    if (item) {
      if (status === 'Approved') {
        item.status = 'Returned';
      } else if (status === 'Rejected') {
        item.status = 'Found'; // Revert back to Found for other potential claimers
      }
      await item.save();
    }

    // Send Notification to user
    const notifMessage = status === 'Approved'
      ? `Great news! Your claim for "${item ? item.title : 'Item'}" has been approved. Please collect it from the admin desk.`
      : `Update: Your claim request for "${item ? item.title : 'Item'}" was rejected after admin review.`;

    await Notification.create({
      user: claim.claimedBy,
      message: notifMessage,
      type: status === 'Approved' ? 'success' : 'warning'
    });

    res.json({ message: `Claim request ${status.toLowerCase()} successfully`, claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClaim,
  getAllClaims,
  getMyClaims,
  processClaimStatus
};
