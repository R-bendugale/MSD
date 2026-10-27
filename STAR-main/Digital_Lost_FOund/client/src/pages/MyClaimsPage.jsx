import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const MyClaimsPage = () => {
  const { claims } = useApp();
  const { user } = useAuth();

  // Filter claims for current user or show demo claims
  const userClaims = claims.filter(
    (c) => c.claimerEmail === user?.email || c.claimedBy === user?.name || true
  );

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-plum">Claims ledger</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">My Claim Requests</h1>
        <p className="text-ink-soft mt-3">
          Track the status of your requested items and admin verification status.
        </p>
      </div>

      <div className="sheet overflow-x-auto">
        <table className="ledger">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Claim Date</th>
              <th>Status</th>
              <th>Proof Submitted</th>
            </tr>
          </thead>
          <tbody>
            {userClaims.map((claim) => (
              <tr key={claim._id}>
                <td className="font-display font-bold text-base">{claim.itemTitle}</td>
                <td className="font-mono text-xs text-ink-soft">{claim.category}</td>
                <td className="font-mono text-xs text-ink-soft">{claim.date}</td>
                <td>
                  <span
                    className={`chip ${
                      claim.status === 'Approved'
                        ? 'chip-moss'
                        : claim.status === 'Rejected'
                        ? 'chip-clay'
                        : 'chip-saffron'
                    }`}
                  >
                    {claim.status === 'Approved' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : claim.status === 'Rejected' ? (
                      <XCircle className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    <span>{claim.status}</span>
                  </span>
                </td>
                <td className="max-w-xs truncate italic font-display text-ink-soft">
                  {claim.proofDetails}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MyClaimsPage;
