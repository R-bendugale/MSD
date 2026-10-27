import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, ShieldAlert, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

const ClaimRequestsPage = () => {
  const { claims, updateClaimStatus } = useApp();
  const [selectedClaim, setSelectedClaim] = useState(null);

  const handleAction = (claimId, status) => {
    updateClaimStatus(claimId, status);
    if (status === 'Approved') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-clay"><ShieldAlert className="w-3 h-3" />Admin only</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">
          Admin Claim Requests Verification
        </h1>
        <p className="text-ink-soft mt-3">
          Review student ownership proofs and approve or reject claim requests.
        </p>
      </div>

      <div className="sheet overflow-x-auto">
        <table className="ledger">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Claimed By</th>
              <th>Claim Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim._id}>
                <td className="font-display font-bold text-base">{claim.itemTitle}</td>
                <td className="font-mono text-xs text-ink-soft">{claim.category}</td>
                <td>
                  <p className="font-bold">{claim.claimedBy}</p>
                  <p className="font-mono text-[10px] text-ink-soft">{claim.claimerEmail}</p>
                </td>
                <td className="font-mono text-xs text-ink-soft">{claim.date}</td>
                <td>
                  <span
                    className={`chip ${
                      claim.status === 'Approved'
                        ? 'chip-moss'
                        : claim.status === 'Rejected'
                        ? 'chip-clay'
                        : 'chip-saffron blink'
                    }`}
                  >
                    {claim.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="inline-flex flex-wrap justify-end gap-2">
                    <button onClick={() => setSelectedClaim(claim)} className="btn btn-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Proof</span>
                    </button>

                    {claim.status === 'Pending' && (
                      <>
                        <button onClick={() => handleAction(claim._id, 'Approved')} className="btn btn-sm btn-moss">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button onClick={() => handleAction(claim._id, 'Rejected')} className="btn btn-sm btn-clay">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Proof Modal */}
      {selectedClaim && (
        <div className="scrim">
          <div className="sheet max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start bg-ink text-paper px-5 py-4">
              <div>
                <h3 className="font-display font-bold text-xl">Verification Proof Details</h3>
                <p className="text-xs text-paper/70 mt-0.5">Submitted by {selectedClaim.claimedBy}</p>
              </div>
              <button onClick={() => setSelectedClaim(null)} className="hover:text-saffron" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="space-y-2 text-sm">
                <p><strong className="font-mono text-[11px] uppercase tracking-wider mr-2">Target Item:</strong>{selectedClaim.itemTitle}</p>
                <p><strong className="font-mono text-[11px] uppercase tracking-wider mr-2">Student Email:</strong>{selectedClaim.claimerEmail}</p>
                <p><strong className="font-mono text-[11px] uppercase tracking-wider mr-2">Submission Date:</strong>{selectedClaim.date}</p>
                <div className="pt-3 border-t-2 border-dashed border-ink">
                  <strong className="block font-mono text-[11px] uppercase tracking-wider mb-2">Ownership Statement & Proof:</strong>
                  <p className="bg-saffron-soft p-3 border-2 border-ink leading-relaxed font-display italic">
                    "{selectedClaim.proofDetails}"
                  </p>
                </div>
              </div>

              {selectedClaim.status === 'Pending' && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      handleAction(selectedClaim._id, 'Approved');
                      setSelectedClaim(null);
                    }}
                    className="btn btn-moss"
                  >
                    Approve Claim
                  </button>
                  <button
                    onClick={() => {
                      handleAction(selectedClaim._id, 'Rejected');
                      setSelectedClaim(null);
                    }}
                    className="btn btn-clay"
                  >
                    Reject Claim
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClaimRequestsPage;
