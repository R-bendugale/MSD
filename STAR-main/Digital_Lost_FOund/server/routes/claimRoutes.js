const express = require('express');
const router = express.Router();
const {
  createClaim,
  getAllClaims,
  getMyClaims,
  processClaimStatus
} = require('../controllers/claimController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createClaim);
router.get('/', protect, adminOnly, getAllClaims);
router.get('/my-claims', protect, getMyClaims);
router.put('/:id/status', protect, adminOnly, processClaimStatus);

module.exports = router;
