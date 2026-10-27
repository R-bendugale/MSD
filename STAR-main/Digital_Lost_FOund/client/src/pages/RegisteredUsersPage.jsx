import React from 'react';
import { Users } from 'lucide-react';

const RegisteredUsersPage = () => {
  const users = [
    {
      id: '1',
      name: 'Shweta Tanaji Kolekar',
      email: 'shweta@gmail.com',
      department: 'CSE',
      className: 'B.Tech',
      rollNo: '29',
      batch: 'B2',
      role: 'user',
      joined: '10 Aug 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    {
      id: '2',
      name: 'Sneha More',
      email: 'sneha@gmail.com',
      department: 'CSE',
      className: 'B.Tech',
      rollNo: '45',
      batch: 'B2',
      role: 'user',
      joined: '12 Aug 2025',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    {
      id: '3',
      name: 'Rahul Patil',
      email: 'rahul@gmail.com',
      department: 'ETC',
      className: 'T.Y.',
      rollNo: '18',
      batch: 'A1',
      role: 'user',
      joined: '15 Aug 2025',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: '4',
      name: 'Campus Admin',
      email: 'admin@dypcet.ac.in',
      department: 'Administration',
      className: 'Staff',
      rollNo: 'ADM-01',
      batch: 'ADM',
      role: 'admin',
      joined: '01 Jan 2025',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    }
  ];

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-ink"><Users className="w-3 h-3" />Directory</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Registered Campus Members</h1>
        <p className="text-ink-soft mt-3">
          Directory of registered students and staff on DYPCET Lost & Found platform.
        </p>
      </div>

      <div className="sheet overflow-x-auto">
        <table className="ledger">
          <thead>
            <tr>
              <th>User</th>
              <th>Department</th>
              <th>Class / Batch</th>
              <th>Roll No</th>
              <th>Role</th>
              <th>Joined On</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-10 h-10 object-cover border-2 border-ink" />
                    <div>
                      <p className="font-display font-bold text-base leading-tight">{u.name}</p>
                      <p className="font-mono text-[10px] text-ink-soft">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{u.department}</td>
                <td className="text-ink-soft">{u.className} ({u.batch})</td>
                <td className="font-mono font-medium">{u.rollNo}</td>
                <td>
                  <span className={`chip ${u.role === 'admin' ? 'chip-clay' : 'chip-moss-soft'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="font-mono text-xs text-ink-soft">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RegisteredUsersPage;
