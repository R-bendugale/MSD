import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Package,
  Search,
  CheckCircle,
  FileCheck,
  ShieldAlert,
  BarChart3,
  PieChart as PieIcon,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { useApp } from '../context/AppContext';

const AdminDashboardPage = () => {
  const { items, claims } = useApp();

  // Metrics
  const totalUsers = 24;
  const totalLost = items.filter((i) => i.type === 'Lost').length;
  const totalFound = items.filter((i) => i.type === 'Found').length;
  const totalReturned = items.filter((i) => i.status === 'Returned').length;
  const pendingClaims = claims.filter((c) => c.status === 'Pending').length;

  // Monthly reports overview chart data
  const monthlyData = [
    { month: 'Mar', lost: 12, found: 15, returned: 8 },
    { month: 'Apr', lost: 19, found: 22, returned: 14 },
    { month: 'May', lost: 15, found: 18, returned: 11 },
    { month: 'Jun', lost: 24, found: 28, returned: 20 },
    { month: 'Jul', lost: 18, found: 25, returned: 16 },
    { month: 'Aug', lost: 28, found: 34, returned: 22 }
  ];

  // Category breakdown chart data
  const categoryData = [
    { name: 'Mobile', value: 35, color: '#2d5a3d' },
    { name: 'Backpack', value: 25, color: '#d4501e' },
    { name: 'Wallet', value: 18, color: '#f2b630' },
    { name: 'Keys', value: 12, color: '#5a3a7a' },
    { name: 'Others', value: 10, color: '#15130e' }
  ];

  const metrics = [
    { to: '/dashboard/users', label: 'Registered Users', value: totalUsers, Icon: Users, tone: 'bg-card' },
    { to: '/dashboard/lost-items', label: 'Total Lost Items', value: totalLost, Icon: Package, tone: 'bg-clay-soft' },
    { to: '/dashboard/found-items', label: 'Total Found Items', value: totalFound, Icon: Search, tone: 'bg-moss-soft' },
    { to: '/dashboard/returned-items', label: 'Items Returned', value: totalReturned, Icon: CheckCircle, tone: 'bg-plum-soft' },
    { to: '/dashboard/claim-requests', label: 'Pending Claims', value: pendingClaims, Icon: FileCheck, tone: 'bg-saffron' },
  ];

  return (
    <div className="space-y-10">

      {/* Title */}
      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-clay"><ShieldAlert className="w-3 h-3" />Control room</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">
          Admin Analytics & Dashboard Overview
        </h1>
        <p className="text-ink-soft mt-3 max-w-3xl">
          Comprehensive metrics, reports visualizer, and item category distribution across campus. Click any card to navigate directly.
        </p>
      </div>

      {/* Metric strip — one connected band */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-[2px] bg-ink border-2 border-ink shadow-[6px_6px_0_#15130e]">
        {metrics.map(({ to, label, value, Icon, tone }) => (
          <Link
            key={to}
            to={to}
            className={`group ${tone} p-5 flex flex-col gap-6 hover:bg-ink hover:text-paper transition-colors`}
          >
            <div className="flex items-center justify-between">
              <Icon className="w-5 h-5" />
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-6xl leading-none">{value}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest mt-2">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Reports overview — grouped bars */}
        <div className="lg:col-span-7 sheet p-6 space-y-4">
          <div>
            <h3 className="font-display font-bold text-2xl flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-clay" />
              <span>Reports Overview Visualizer</span>
            </h3>
            <p className="text-sm text-ink-soft">Monthly breakdown of lost vs found vs returned items</p>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-clay border-2 border-ink" />Lost Items</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-moss border-2 border-ink" />Found Items</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="4 4" stroke="#15130e" strokeOpacity={0.25} vertical={false} />
                <XAxis dataKey="month" stroke="#15130e" fontSize={11} tickLine={false} />
                <YAxis stroke="#15130e" fontSize={11} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(242,182,48,0.25)' }}
                  contentStyle={{ borderRadius: 0, border: '2px solid #15130e', background: '#fffcf4', fontSize: '12px', boxShadow: '4px 4px 0 #15130e' }}
                />
                <Bar dataKey="lost" name="Lost Items" fill="#d4501e" stroke="#15130e" strokeWidth={2} />
                <Bar dataKey="found" name="Found Items" fill="#2d5a3d" stroke="#15130e" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown — ranked meters */}
        <div className="lg:col-span-5 sheet p-6 space-y-5">
          <div>
            <h3 className="font-display font-bold text-2xl flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-moss" />
              <span>Item Category Breakdown</span>
            </h3>
            <p className="text-sm text-ink-soft">Percentage distribution by category</p>
          </div>

          <ul className="space-y-4">
            {categoryData.map((cat) => (
              <li key={cat.name}>
                <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-wider mb-1.5">
                  <span>{cat.name}</span>
                  <strong className="font-display text-xl normal-case tracking-normal">{cat.value}%</strong>
                </div>
                <div className="h-4 border-2 border-ink bg-paper">
                  <div className="h-full border-r-2 border-ink" style={{ width: `${cat.value}%`, backgroundColor: cat.color }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardPage;
