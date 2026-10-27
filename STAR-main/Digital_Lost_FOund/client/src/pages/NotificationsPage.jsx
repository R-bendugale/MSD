import React from 'react';
import { Bell, CheckCircle2, Info, AlertTriangle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotificationsPage = () => {
  const { notifications } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-saffron"><Bell className="w-3 h-3" />Inbox</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Notifications & Activity Log</h1>
        <p className="text-ink-soft mt-3">
          Stay updated on claim verifications, reported items, and admin approvals.
        </p>
      </div>

      {/* Timeline */}
      <ol className="relative border-l-2 border-ink ml-3 space-y-6">
        {notifications.map((notif) => (
          <li key={notif._id} className="relative pl-8">
            <span
              className={`absolute -left-[13px] top-4 w-6 h-6 border-2 border-ink flex items-center justify-center ${
                notif.type === 'success' ? 'bg-moss text-card' : notif.type === 'warning' ? 'bg-saffron text-ink' : 'bg-plum text-card'
              }`}
            >
              {notif.type === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : notif.type === 'warning' ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <Info className="w-3.5 h-3.5" />
              )}
            </span>

            <div className={`sheet-flat p-4 flex items-start justify-between gap-4 ${notif.isRead ? '' : 'bg-saffron-soft shadow-[4px_4px_0_#15130e]'}`}>
              <div className="space-y-1.5">
                <p className="font-display font-bold text-lg leading-snug">{notif.message}</p>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                  <Clock className="w-3 h-3" />
                  <span>{notif.time}</span>
                </div>
              </div>

              {!notif.isRead && <span className="chip chip-clay shrink-0">New</span>}
            </div>
          </li>
        ))}
      </ol>

    </div>
  );
};

export default NotificationsPage;
