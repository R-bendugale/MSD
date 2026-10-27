import React, { useState } from 'react';
import { Search, MapPin, Calendar, FileCheck, ListFilter, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const FoundItemsPage = () => {
  const { items, submitClaim } = useApp();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [proofDetails, setProofDetails] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const foundItems = items.filter((item) => item.type === 'Found');

  const filtered = foundItems.filter((item) => {
    const matchesCat = category === 'All' || item.category === category;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    submitClaim({
      itemId: selectedItem._id,
      itemTitle: selectedItem.title,
      category: selectedItem.category,
      claimerName: user?.name || 'Student',
      claimerEmail: user?.email || 'student@gmail.com',
      proofDetails
    });

    setClaimSubmitted(true);
    setTimeout(() => {
      setClaimSubmitted(false);
      setSelectedItem(null);
      setProofDetails('');
    }, 1500);
  };

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-moss">Register · Found</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Found Items Feed</h1>
        <p className="text-ink-soft mt-3 max-w-2xl">
          Browse items found across campus and submit a claim request to recover your lost belongings.
        </p>
      </div>

      {/* Filter strip */}
      <div className="flex flex-col sm:flex-row gap-4 border-2 border-ink bg-moss-soft p-3">
        <div className="relative flex-1">
          <Search className="field-ico" />
          <input
            type="text"
            placeholder="Search found items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field field-icon"
          />
        </div>

        <div className="relative sm:w-64">
          <ListFilter className="field-ico" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="field field-icon">
            <option value="All">All Categories</option>
            <option value="Backpack">Backpack</option>
            <option value="Mobile">Mobile</option>
            <option value="Wallet">Wallet</option>
            <option value="Keys">Keys</option>
            <option value="Spectacles">Spectacles</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* Folder cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filtered.map((item) => (
          <div key={item._id} className="relative pt-7">
            <span className="absolute top-0 left-4 bg-ink text-paper font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-2 border-ink">
              {item.category}
            </span>
            <span
              className={`absolute top-0 right-4 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-2 border-ink ${
                item.status === 'Returned'
                  ? 'bg-plum text-card'
                  : item.status === 'Pending Claim'
                  ? 'bg-saffron text-ink'
                  : 'bg-moss text-card'
              }`}
            >
              {item.status}
            </span>

            <article className="sheet flex flex-col h-full">
              <div className="h-44 overflow-hidden bg-paper-deep border-b-2 border-ink">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 flex-1">
                <h3 className="font-display font-bold text-xl leading-tight">{item.title}</h3>
                <p className="text-sm text-ink-soft line-clamp-2 mt-1.5 leading-relaxed">{item.description}</p>

                <div className="mt-3 space-y-1 font-mono text-[11px] text-ink-soft">
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /><span>{item.location}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /><span>{item.date}</span></div>
                </div>
              </div>

              <div className="px-5 py-3 border-t-2 border-dashed border-ink flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">By {item.reporterName}</span>
                {item.status === 'Returned' ? (
                  <span className="chip chip-plum-soft">Reunited</span>
                ) : (
                  <button onClick={() => setSelectedItem(item)} className="btn btn-sm btn-moss">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Claim Item</span>
                  </button>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Claim Modal */}
      {selectedItem && (
        <div className="scrim">
          <div className="sheet max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {claimSubmitted ? (
              <div className="text-center py-12 px-6 space-y-3 bg-moss-soft">
                <CheckCircle2 className="w-14 h-14 text-moss mx-auto" />
                <h3 className="font-display font-bold text-2xl">Claim Submitted!</h3>
                <p className="text-sm text-ink-soft">
                  Your claim request for "{selectedItem.title}" has been sent for admin verification.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start bg-moss text-card px-5 py-4">
                  <div>
                    <h3 className="font-display font-bold text-xl">Submit Claim Request</h3>
                    <p className="text-xs text-card/80 mt-0.5">Provide proof of ownership for {selectedItem.title}</p>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="hover:text-saffron" aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5 space-y-5">
                  <div className="flex items-center gap-3 bg-paper p-3 border-2 border-ink">
                    <img src={selectedItem.image} alt={selectedItem.title} className="w-14 h-14 object-cover border-2 border-ink" />
                    <div>
                      <h4 className="font-display font-bold">{selectedItem.title}</h4>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">{selectedItem.category} • Found at {selectedItem.location}</p>
                    </div>
                  </div>

                  <form onSubmit={handleClaimSubmit} className="space-y-5">
                    <div>
                      <label className="field-label">Proof of Ownership / Verification Details *</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Describe unique identification marks, phone unlock pin specs, ID details, contents inside, or purchase receipt..."
                        value={proofDetails}
                        onChange={(e) => setProofDetails(e.target.value)}
                        className="field resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setSelectedItem(null)} className="btn">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-moss">
                        Submit Claim
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default FoundItemsPage;
