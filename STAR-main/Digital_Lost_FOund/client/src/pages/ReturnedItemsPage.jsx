import React from 'react';
import { CheckCircle, Sparkles, MapPin, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ReturnedItemsPage = () => {
  const { items } = useApp();
  const returnedItems = items.filter((i) => i.status === 'Returned');

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-plum"><Sparkles className="w-3 h-3" />Hall of fame</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">
          Returned Items – <span className="italic text-plum">Reunited Hall</span>
        </h1>
        <p className="text-ink-soft mt-3">
          Items successfully reunited with their owners through our campus lost & found platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {returnedItems.map((item, idx) => (
          <article
            key={item._id}
            className={`bg-card border-2 border-ink p-3 pb-5 shadow-[6px_6px_0_#5a3a7a] transition-transform hover:rotate-0 ${
              idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
            }`}
          >
            <div className="relative h-44 overflow-hidden border-2 border-ink bg-paper-deep">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 right-2 chip chip-plum">
                <CheckCircle className="w-3 h-3" />
                <span>Returned</span>
              </div>
            </div>

            <div className="pt-4 px-2 space-y-2">
              <h3 className="font-display font-bold text-xl leading-tight">{item.title}</h3>
              <p className="text-sm text-ink-soft line-clamp-2 leading-relaxed">{item.description}</p>

              <div className="pt-3 border-t-2 border-dashed border-ink flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                <div className="flex items-center gap-1 text-ink-soft">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-plum font-medium">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Reunited</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};

export default ReturnedItemsPage;
