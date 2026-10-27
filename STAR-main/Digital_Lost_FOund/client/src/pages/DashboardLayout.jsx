import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderTopBar from '../components/HeaderTopBar';
import { useAuth } from '../context/AuthContext';
import { Bell, Shuffle } from 'lucide-react';

const DashboardLayout = () => {
  const { user, switchAccount } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderTopBar />

      {/* Slim header */}
      <header className="bg-ink text-paper border-b-2 border-ink sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
            <span className="text-saffron">●</span>
            <span className="opacity-60">Dashboard</span>
            <span className="opacity-40">→</span>
            <span className="font-medium">
              {user?.role === 'admin' ? 'Admin Control Center' : 'Student Workspace'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchAccount(user?.role === 'admin' ? 'user' : 'admin')}
              className="hidden sm:inline-flex items-center gap-1.5 border border-paper/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider hover:bg-saffron hover:text-ink hover:border-saffron transition-colors"
              title="Toggle between Student and Admin demo mode"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Switch to {user?.role === 'admin' ? 'Student View' : 'Admin View'}</span>
            </button>

            <Link
              to="/dashboard/notifications"
              className="relative p-2 border border-paper/50 hover:bg-paper hover:text-ink transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-clay border border-ink blink"></span>
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-paper/40">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 object-cover border-2 border-saffron"
              />
              <span className="font-mono text-[11px] uppercase tracking-wider hidden md:inline">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      <Sidebar />

      {/* Sub-view Outlet */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
