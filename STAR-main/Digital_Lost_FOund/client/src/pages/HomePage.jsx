import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Users,
  Search,
  CheckCircle,
  Sparkles,
  MapPin,
  Calendar,
  Smile,
  FileText,
  Handshake,
  PackageSearch,
  PackageCheck
} from 'lucide-react';
import HeaderTopBar from '../components/HeaderTopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';

const HomePage = () => {
  const { items } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mobile', 'Electronics', 'Backpack', 'Wallet', 'Keys', 'Spectacles', 'ID Card'];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { n: '128', label: 'Lost Items Reported', Icon: PackageSearch },
    { n: '156', label: 'Found Items Reported', Icon: CheckCircle },
    { n: '342', label: 'Items Returned', Icon: PackageCheck },
    { n: '95%', label: 'Successful Returns', Icon: Smile },
  ];

  const ticker = [
    'Lost something?', 'Found something?', 'Report it', 'Match it', 'Return it',
    'Lost something?', 'Found something?', 'Report it', 'Match it', 'Return it',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderTopBar />
      <Navbar />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-14 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* Left copy */}
          <div className="lg:col-span-7 space-y-8">
            <span className="chip chip-moss-soft">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted by our campus community
            </span>

            <h1 className="font-display font-extrabold text-6xl sm:text-7xl xl:text-8xl leading-[0.92]">
              Lost Something?
              <br />
              <span className="italic text-clay relative inline-block">
                We Can Help!
                <svg className="absolute -bottom-3 left-0 w-full" height="12" viewBox="0 0 300 12" preserveAspectRatio="none">
                  <path d="M2 8 Q 40 0 80 7 T 160 6 T 240 7 T 298 4" fill="none" stroke="#15130e" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-ink-soft max-w-xl leading-relaxed">
              A smart and secure platform to report, search and return lost and found items across our campus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard/report-lost" className="btn btn-clay !py-4 !px-6 justify-between gap-6">
                <span className="text-left">
                  <span className="block text-sm">Report Lost Item</span>
                  <span className="block text-[10px] opacity-80 normal-case tracking-normal">Let us help you find it</span>
                </span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link to="/dashboard/report-found" className="btn btn-moss !py-4 !px-6 justify-between gap-6">
                <span className="text-left">
                  <span className="block text-sm">Report Found Item</span>
                  <span className="block text-[10px] opacity-80 normal-case tracking-normal">Help return to owner</span>
                </span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* 3 promises */}
            <ol className="grid grid-cols-1 sm:grid-cols-3 border-2 border-ink bg-card divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-ink">
              {[
                { Icon: ShieldCheck, t: 'Secure & Reliable', d: 'Your data is safe with us' },
                { Icon: Zap, t: 'Quick & Easy', d: 'Report in just a few clicks' },
                { Icon: Users, t: 'Community Driven', d: 'Together we help each other' },
              ].map(({ Icon, t, d }) => (
                <li key={t} className="p-4 flex items-start gap-3">
                  <Icon className="w-5 h-5 shrink-0 mt-0.5 text-moss" />
                  <div>
                    <h4 className="font-display font-bold text-sm leading-tight">{t}</h4>
                    <p className="text-xs text-ink-soft mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right — polaroid collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rotate-2">
              <div className="bg-card border-2 border-ink p-3 pb-14 shadow-[10px_10px_0_#15130e]">
                <img
                  src="/college_hero.png"
                  alt="DYPCET College Campus Building"
                  className="w-full h-[380px] object-cover border-2 border-ink grayscale-[25%] contrast-110"
                />
                <p className="absolute bottom-4 left-0 right-0 text-center font-display italic text-lg">
                  DYPCET, Kolhapur — where things find their way home
                </p>
              </div>

              {/* Tape */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-saffron/80 border-2 border-ink -rotate-3" />

              {/* Tag 1 — lost */}
              <div className="absolute -left-10 top-16 w-56 bg-card border-2 border-ink p-2.5 flex items-center gap-3 shadow-[4px_4px_0_#15130e] -rotate-6 drift">
                <img src="/wallet.png" alt="Black Wallet" className="w-12 h-12 object-cover border-2 border-ink" />
                <div className="min-w-0">
                  <span className="chip chip-clay"><span className="w-1.5 h-1.5 bg-card blink" />Lost Item</span>
                  <h4 className="font-display font-bold text-sm mt-1 leading-tight">Black Wallet</h4>
                  <p className="text-[11px] text-ink-soft">Lost near Library · 2 hours ago</p>
                </div>
              </div>

              {/* Tag 2 — found */}
              <div className="absolute -right-8 bottom-28 w-56 bg-card border-2 border-ink p-2.5 flex items-center gap-3 shadow-[4px_4px_0_#15130e] rotate-3">
                <img src="/backpack.png" alt="Blue Backpack" className="w-12 h-12 object-cover border-2 border-ink" />
                <div className="min-w-0">
                  <span className="chip chip-moss">Found Item</span>
                  <h4 className="font-display font-bold text-sm mt-1 leading-tight">Blue Backpack</h4>
                  <p className="text-[11px] text-ink-soft">Found at Sports Hall · 1 hour ago</p>
                </div>
              </div>

              {/* Stamp */}
              <div className="absolute -bottom-6 left-4 bg-plum text-card border-2 border-ink px-4 py-2 stamp-rotate flex items-center gap-2 shadow-[4px_4px_0_#15130e]">
                <Sparkles className="w-4 h-4" />
                <div className="leading-none">
                  <h5 className="font-display font-extrabold text-base">Reunited!</h5>
                  <p className="font-mono text-[9px] uppercase tracking-wider opacity-80 mt-0.5">Item returned successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="border-t-2 border-ink bg-ink text-paper overflow-hidden">
          <div className="ticker-track py-2.5">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="px-6 font-display italic text-lg whitespace-nowrap">
                {t} <span className="text-saffron not-italic">✺</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STATS ───────── */}
      <section className="bg-saffron border-b-2 border-ink">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-ink">
          {stats.map(({ n, label, Icon }) => (
            <div key={label} className="px-6 py-8 flex flex-col gap-2 border-b-2 md:border-b-0 border-ink">
              <Icon className="w-5 h-5" />
              <span className="font-display font-extrabold text-5xl sm:text-6xl leading-none">{n}</span>
              <p className="kicker !text-ink">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section id="how-it-works" className="py-20 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="kicker">— The process</p>
            <h2 className="font-display font-extrabold text-5xl mt-3 leading-none">How It <span className="italic text-moss">Works</span></h2>
            <p className="text-ink-soft mt-4 max-w-xs">Simple steps to report and recover items</p>
          </div>

          <div className="lg:col-span-8 sheet divide-y-2 divide-ink">
            {[
              { n: '01', t: 'Report', d: 'Report lost or found item with complete details including category, location, and photos.', Icon: FileText, bg: 'bg-clay text-card' },
              { n: '02', t: 'Match', d: 'We match possible items and notify the owner when a matching lost/found record is registered.', Icon: Search, bg: 'bg-moss text-card' },
              { n: '03', t: 'Return', d: 'Verify identity proof with admin and collect your returned item safely from campus desk.', Icon: Handshake, bg: 'bg-plum text-card' },
            ].map(({ n, t, d, Icon, bg }) => (
              <div key={n} className="grid grid-cols-[auto_1fr_auto] items-center gap-6 p-6 hover:bg-saffron-soft transition-colors">
                <span className="font-display italic font-extrabold text-6xl text-transparent [-webkit-text-stroke:2px_#15130e] w-24">{n}</span>
                <div>
                  <h3 className="font-display font-bold text-2xl">{parseInt(n)}. {t}</h3>
                  <p className="text-sm text-ink-soft mt-1 leading-relaxed max-w-lg">{d}</p>
                </div>
                <span className={`w-14 h-14 border-2 border-ink flex items-center justify-center ${bg}`}>
                  <Icon className="w-6 h-6" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ITEMS ───────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
            <div>
              <p className="kicker">— Notice board</p>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl mt-2 leading-none">
                Recently Found <span className="italic text-clay">&amp;</span> Lost Items
              </h2>
              <p className="text-ink-soft mt-3">Explore campus reports and claim your belongings</p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="field-ico" />
              <input
                type="text"
                placeholder="Search items or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field field-icon"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 border-2 border-ink font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-ink text-paper shadow-[3px_3px_0_#f2b630]'
                    : 'bg-card hover:bg-saffron-soft'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ticket grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredItems.slice(0, 6).map((item) => (
              <article key={item._id} className="sheet lift flex">
                <div className="relative w-40 sm:w-48 shrink-0 border-r-2 border-ink bg-paper-deep">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute top-0 left-0 chip chip-ink border-0 border-r-2 border-b-2 border-ink">
                    {item.category}
                  </span>
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between gap-4 min-w-0">
                  <div>
                    <span
                      className={`chip ${
                        item.type === 'Lost' ? 'chip-clay' : item.status === 'Returned' ? 'chip-plum' : 'chip-moss'
                      }`}
                    >
                      {item.status}
                    </span>
                    <h3 className="font-display font-bold text-xl mt-2 leading-tight line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-ink-soft line-clamp-2 mt-1 leading-relaxed">{item.description}</p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-soft">
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>
                      <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-dashed border-ink flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">By {item.reporterName}</span>
                    <Link
                      to={item.type === 'Found' ? '/dashboard/found-items' : '/dashboard/lost-items'}
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider font-medium underline underline-offset-4 decoration-2 decoration-clay hover:text-clay"
                    >
                      <span>{item.type === 'Found' ? 'Claim Item' : 'View Details'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/dashboard/found-items" className="btn btn-ink !py-4 !px-8">
              <span>View All Campus Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
