import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  Package,
  CheckCircle,
  FileCheck,
  Bell,
  User,
  LogOut,
  ShieldAlert,
  Users,
  GitBranch
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { notifications } = useApp();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const userNavItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Report Lost Item', icon: PlusCircle, path: '/dashboard/report-lost' },
    { label: 'Report Found Item', icon: PlusCircle, path: '/dashboard/report-found' },
    { label: 'Lost Items', icon: Package, path: '/dashboard/lost-items' },
    { label: 'Found Items', icon: Search, path: '/dashboard/found-items' },
    { label: 'My Claims', icon: FileCheck, path: '/dashboard/my-claims' },
    { label: 'Returned Items', icon: CheckCircle, path: '/dashboard/returned-items' },
    { label: 'Notifications', icon: Bell, path: '/dashboard/notifications', badge: unreadCount },
    { label: 'Profile', icon: User, path: '/dashboard/profile' },
  ];

  const adminNavItems = [
    { label: 'Admin Overview', icon: ShieldAlert, path: '/dashboard/admin' },
    { label: 'Claim Requests', icon: FileCheck, path: '/dashboard/claim-requests' },
    { label: 'Registered Users', icon: Users, path: '/dashboard/users' },
  ];

  const tab = (isActive, active) =>
    `relative flex items-center gap-2 px-3 py-2 border-2 font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-all ${
      isActive
        ? `${active} border-ink shadow-[3px_3px_0_#15130e] -translate-y-0.5`
        : 'border-transparent hover:border-ink hover:bg-card'
    }`;

  return (
    <aside className="bg-paper-deep border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col gap-4">
        {/* ID-badge row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 bg-card border-2 border-ink pr-4 shadow-[3px_3px_0_#15130e]">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
              alt={user?.name}
              className="w-12 h-12 object-cover border-r-2 border-ink"
            />
            <div className="overflow-hidden py-1">
              <h3 className="font-display font-bold text-base leading-tight truncate">{user?.name}</h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft truncate">
                {user?.department} • Roll {user?.rollNo}
              </p>
            </div>
            <span className="chip chip-saffron">
              {user?.role === 'admin' ? 'Campus Admin' : 'Student (B2)'}
            </span>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="btn btn-sm text-clay"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mb-1">
          {userNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => tab(isActive, 'bg-ink text-paper')}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="bg-clay text-card border-2 border-ink text-[10px] font-medium px-1.5 leading-4">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Admin Panel Section */}
          {user?.role === 'admin' && (
            <>
              <span className="shrink-0 w-px h-6 bg-ink mx-1" />
              <span className="shrink-0 chip chip-clay">
                <ShieldAlert className="w-3 h-3" />
                Admin
              </span>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => tab(isActive, 'bg-clay text-card')}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </>
          )}

          {/* Architecture Flow Quick Link */}
          <span className="shrink-0 w-px h-6 bg-ink mx-1" />
          <NavLink
            to="/dashboard/flow"
            className={({ isActive }) => tab(isActive, 'bg-moss text-card')}
          >
            <GitBranch className="w-4 h-4" />
            <span>Flow & Tech Stack</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
