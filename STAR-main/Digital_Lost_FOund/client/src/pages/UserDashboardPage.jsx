import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, FileCheck, CheckCircle, ArrowRight, ArrowUpRight, Eye, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const { items, claims } = useApp();

  const myLostCount = items.filter((i) => i.type === 'Lost').length;
  const myFoundCount = items.filter((i) => i.type === 'Found').length;
  const myClaimsCount = claims.length;
  const returnedCount = items.filter((i) => i.status === 'Returned').length;

  const tiles = [
    { to: '/dashboard/lost-items', label: 'My Lost Items', value: myLostCount, Icon: Package, bar: 'bg-clay' },
    { to: '/dashboard/found-items', label: 'My Found Items', value: myFoundCount, Icon: Search, bar: 'bg-moss' },
    { to: '/dashboard/my-claims', label: 'My Claims', value: myClaimsCount, Icon: FileCheck, bar: 'bg-plum' },
    { to: '/dashboard/returned-items', label: 'Returned Items', value: returnedCount, Icon: CheckCircle, bar: 'bg-saffron' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b-2 border-ink pb-8">
        <div className="lg:col-span-8">
          <p className="kicker">— Overview</p>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl leading-none mt-2">
            Welcome, <span className="italic text-moss">{user?.name ? user.name.split(' ')[0] : 'Student'}</span>! 👋
          </h1>
          <p className="text-ink-soft mt-3">Here's what's happening with your reported items today.</p>
        </div>

        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
          <Link to="/dashboard/report-lost" className="btn btn-clay">
            <PlusCircle className="w-4 h-4" />
            <span>Report Lost Item</span>
          </Link>
          <Link to="/dashboard/report-found" className="btn btn-moss">
            <PlusCircle className="w-4 h-4" />
            <span>Report Found Item</span>
          </Link>
        </div>
      </div>

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiles.map(({ to, label, value, Icon, bar }) => (
          <Link key={to} to={to} className="sheet lift group block">
            <div className={`h-3 border-b-2 border-ink ${bar}`} />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="kicker !text-ink">{label}</p>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="flex items-end justify-between mt-4">
                <span className="font-display font-extrabold text-7xl leading-none">{value}</span>
                <Icon className="w-8 h-8 text-ink-soft" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Items */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-3xl leading-none">Recent Items</h3>
            <p className="text-sm text-ink-soft mt-1">Overview of recent lost & found activity on campus</p>
          </div>
          <Link to="/dashboard/found-items" className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider underline underline-offset-4 decoration-2 decoration-clay">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="sheet overflow-x-auto">
          <table className="ledger">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.slice(0, 5).map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover border-2 border-ink" />
                  </td>
                  <td className="font-display font-bold text-base">{item.title}</td>
                  <td>
                    <span className={`chip ${item.type === 'Lost' ? 'chip-clay-soft' : 'chip-moss-soft'}`}>{item.type}</span>
                  </td>
                  <td className="font-mono text-xs">{item.category}</td>
                  <td>
                    <span className={`chip ${
                      item.status === 'Returned' ? 'chip-plum' : item.status === 'Lost' ? 'chip-clay' : 'chip-moss'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-ink-soft">{item.date}</td>
                  <td className="text-right">
                    <Link
                      to={item.type === 'Found' ? '/dashboard/found-items' : '/dashboard/lost-items'}
                      className="btn btn-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserDashboardPage;
