import React, { useState } from 'react';
import { Search, MapPin, Calendar, Eye, ListFilter, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LostItemsPage = () => {
  const { items } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const lostItems = items.filter((item) => item.type === 'Lost');

  const filtered = lostItems.filter((item) => {
    const matchesCat = category === 'All' || item.category === category;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-clay">Register · Lost</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Lost Items Directory</h1>
        <p className="text-ink-soft mt-3">
          Items reported as lost by campus students and staff members.
        </p>
      </div>

      {/* Filter strip */}
      <div className="flex flex-col sm:flex-row gap-4 border-2 border-ink bg-saffron-soft p-3">
        <div className="relative flex-1">
          <Search className="field-ico" />
          <input
            type="text"
            placeholder="Search lost items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field field-icon"
          />
        </div>

        <div className="relative sm:w-64">
          <ListFilter className="field-ico" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="field field-icon">
            <option value="All">All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Backpack">Backpack</option>
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
            {/* folder tab */}
            <span className="absolute top-0 left-4 bg-ink text-paper font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-2 border-ink">
              {item.category}
            </span>
            <span className="absolute top-0 right-4 bg-clay text-card font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-2 border-ink">
              Lost
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
                <button onClick={() => setSelectedItem(item)} className="btn btn-sm btn-saffron">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <div className="scrim">
          <div className="sheet max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center bg-ink text-paper px-5 py-3">
              <h3 className="font-display font-bold text-xl">{selectedItem.title}</h3>
              <button onClick={() => setSelectedItem(null)} className="hover:text-saffron" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-52 object-cover border-2 border-ink" />

              <dl className="text-sm space-y-2">
                <p><strong className="font-mono text-[11px] uppercase tracking-wider mr-2">Category:</strong>{selectedItem.category}</p>
                <p><strong className="font-mono text-[11px] uppercase tracking-wider mr-2">Location Lost:</strong>{selectedItem.location}</p>
                <p><strong className="font-mono text-[11px] uppercase tracking-wider mr-2">Date Reported:</strong>{selectedItem.date}</p>
                <p><strong className="font-mono text-[11px] uppercase tracking-wider mr-2">Reported By:</strong>{selectedItem.reporterName} ({selectedItem.reporterEmail})</p>
                <p className="bg-saffron-soft p-3 border-2 border-ink leading-relaxed mt-2">
                  {selectedItem.description}
                </p>
              </dl>

              <button onClick={() => setSelectedItem(null)} className="btn btn-ink btn-block">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LostItemsPage;
