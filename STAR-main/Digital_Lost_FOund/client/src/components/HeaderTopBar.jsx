import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const HeaderTopBar = () => {
  return (
    <div className="bg-saffron text-ink border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 flex flex-col md:flex-row justify-between items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-medium">D. Y. Patil College of Engineering & Technology, Kolhapur</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="tel:+911234567890" className="flex items-center gap-1.5 hover:underline underline-offset-4">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 12345 67890</span>
          </a>
          <a href="mailto:support@dypcet.ac.in" className="flex items-center gap-1.5 hover:underline underline-offset-4">
            <Mail className="w-3.5 h-3.5" />
            <span>support@dypcet.ac.in</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;
