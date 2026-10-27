import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, User, LogOut, LayoutDashboard, Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, switchAccount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const isActive = (path) => location.pathname === path;

  const linkCls = (path) =>
    `px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest border-2 transition-colors ${
      isActive(path)
        ? 'bg-ink text-paper border-ink'
        : 'border-transparent hover:border-ink hover:bg-saffron-soft'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-paper border-b-2 border-ink">
      {/* Row 1 — masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 grid grid-cols-3 items-center">
        <div className="hidden md:block kicker">Campus Desk · Open 9 – 5</div>
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Logo — centred masthead */}
        <Link to="/" className="justify-self-center flex items-center gap-3 group">
          <span className="w-10 h-10 bg-clay text-card border-2 border-ink flex items-center justify-center rotate-3 group-hover:-rotate-3 transition-transform shadow-[3px_3px_0_#15130e]">
            <Compass className="w-5 h-5" />
          </span>
          <span className="leading-none text-center">
            <span className="block font-display text-2xl font-extrabold italic">Lost &amp; Found</span>
            <span className="block kicker mt-1">Campus Portal</span>
          </span>
        </Link>

        {/* Auth */}
        <div className="justify-self-end">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 border-2 border-ink bg-card pr-3 shadow-[3px_3px_0_#15130e] hover:shadow-[5px_5px_0_#15130e] transition-shadow"
              >
                <img src={user.avatar} alt={user.name} className="w-9 h-9 object-cover border-r-2 border-ink" />
                <span className="font-mono text-[11px] uppercase tracking-wider hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-3 w-64 sheet z-50">
                  <div className="px-4 py-3 border-b-2 border-ink bg-saffron-soft">
                    <p className="kicker">Signed in as</p>
                    <p className="font-display font-bold text-lg truncate">{user.name}</p>
                    <span className="chip chip-ink mt-1">{user.role} · {user.department}</span>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-wider hover:bg-ink hover:text-paper"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>

                  <button
                    onClick={() => {
                      switchAccount(user.role === 'admin' ? 'user' : 'admin');
                      setUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-wider hover:bg-plum hover:text-card text-left border-t-2 border-ink"
                  >
                    <User className="w-4 h-4" />
                    <span>Switch to {user.role === 'admin' ? 'Student View' : 'Admin View'}</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-wider text-clay hover:bg-clay hover:text-card text-left border-t-2 border-ink"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-ink">
              <span>Login / Register</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Row 2 — link strip */}
      <nav className="hidden md:block border-t-2 border-ink bg-card">
        <div className="max-w-7xl mx-auto px-8 py-2 flex items-center justify-center gap-1">
          <Link to="/" className={linkCls('/')}>Home</Link>
          <span className="text-ink-soft">/</span>
          <Link to="/dashboard/report-lost" className={linkCls('/dashboard/report-lost')}>Report Lost Item</Link>
          <span className="text-ink-soft">/</span>
          <Link to="/dashboard/report-found" className={linkCls('/dashboard/report-found')}>Report Found Item</Link>
          <span className="text-ink-soft">/</span>
          <Link to="/dashboard/found-items" className={linkCls('/dashboard/found-items')}>Search Items</Link>
          <span className="text-ink-soft">/</span>
          <a href="#how-it-works" className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest border-2 border-transparent hover:border-ink hover:bg-saffron-soft">
            How It Works
          </a>
          <span className="text-ink-soft">/</span>
          <Link to="/dashboard/flow" className={linkCls('/dashboard/flow')}>Architecture</Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t-2 border-ink px-4 py-4 grid gap-2">
          {[
            ['/', 'Home'],
            ['/dashboard/report-lost', 'Report Lost Item'],
            ['/dashboard/report-found', 'Report Found Item'],
            ['/dashboard/found-items', 'Search Items'],
            ['/dashboard/flow', 'Architecture Flow'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className="border-2 border-ink px-3 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-saffron"
            >
              {label}
            </Link>
          ))}
          {user ? (
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn btn-moss">
              Go to Dashboard ({user.name})
            </Link>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-ink">
              Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
