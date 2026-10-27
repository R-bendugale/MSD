import React from 'react';
import { Compass, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const link = 'hover:underline underline-offset-4 decoration-2 decoration-saffron';
  return (
    <footer className="bg-card border-t-2 border-ink">
      {/* hazard divider */}
      <div className="hazard h-3 border-b-2 border-ink" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1 */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-moss text-card border-2 border-ink flex items-center justify-center -rotate-3">
                <Compass className="w-5 h-5" />
              </span>
              <span className="font-display text-2xl font-extrabold italic">Lost &amp; Found Portal</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft max-w-md">
              Official Digital Lost and Found Management System for D. Y. Patil College of Engineering & Technology, Kolhapur. Reconnecting campus items with owners efficiently.
            </p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-2">
            <h4 className="kicker mb-4 text-ink">§ Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className={link}>Home Portal</Link></li>
              <li><Link to="/dashboard/report-lost" className={link}>Report Lost Item</Link></li>
              <li><Link to="/dashboard/report-found" className={link}>Report Found Item</Link></li>
              <li><Link to="/dashboard/lost-items" className={link}>Browse Lost Items</Link></li>
              <li><Link to="/dashboard/found-items" className={link}>Browse Found Items</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-2">
            <h4 className="kicker mb-4 text-ink">§ System Modules</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard/my-claims" className={link}>Track My Claims</Link></li>
              <li><Link to="/dashboard/returned-items" className={link}>Reunited Items Hall</Link></li>
              <li><Link to="/dashboard/admin" className={link}>Admin Verification Portal</Link></li>
              <li><Link to="/dashboard/flow" className={link}>Project Flow Diagram</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="md:col-span-3">
            <h4 className="kicker mb-4 text-ink">§ Campus Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-clay" />
                <span>Kasaba Bawada, Kolhapur, Maharashtra 416006</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-moss" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-plum" />
                <span>support@dypcet.ac.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t-2 border-ink flex flex-col md:flex-row justify-between items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
          <p>© 2026 Digital Lost and Found Management System. DYPCET Kolhapur.</p>
          <div className="flex items-center gap-1.5">
            <span>A safer campus, a stronger community</span>
            <Heart className="w-3.5 h-3.5 text-clay fill-clay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
