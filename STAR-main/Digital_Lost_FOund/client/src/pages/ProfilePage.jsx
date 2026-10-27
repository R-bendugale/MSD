import React, { useState } from 'react';
import { Edit, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Student User',
    department: user?.department || 'Computer Science',
    className: user?.className || 'B.Tech',
    rollNo: user?.rollNo || '01',
    batch: user?.batch || 'B1',
    email: user?.email || 'student@dypcet.ac.in'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const details = [
    ['Department', user?.department || formData.department],
    ['Class', user?.className || formData.className],
    ['Roll Number', user?.rollNo || formData.rollNo],
    ['Batch', user?.batch || formData.batch],
    ['Registered Email', user?.email || formData.email],
    ['Institution', 'DYPCET Kolhapur'],
  ];

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-moss-soft">Identity</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Student Profile</h1>
        <p className="text-ink-soft mt-3">
          Manage your personal student details and academic record on the campus portal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ID card */}
        <aside className="lg:col-span-4 bg-card border-2 border-ink shadow-[8px_8px_0_#15130e] rotate-[-1.5deg]">
          <div className="hazard h-4 border-b-2 border-ink" />
          <div className="p-6 text-center space-y-4">
            <p className="kicker !text-ink">Student ID · DYPCET</p>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name || 'Student'}
              className="w-36 h-36 object-cover border-2 border-ink mx-auto bg-paper shadow-[4px_4px_0_#f2b630]"
            />
            <div>
              <h2 className="font-display font-extrabold text-2xl leading-tight">{user?.name || formData.name}</h2>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft mt-1">
                {user?.department || formData.department} • {user?.className || formData.className} ({user?.batch || formData.batch})
              </p>
            </div>
            <span className="chip chip-moss"><ShieldCheck className="w-3 h-3" />DYPCET Verified Student</span>
          </div>
          <div className="border-t-2 border-dashed border-ink px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-center text-ink-soft">
            Roll {user?.rollNo || formData.rollNo}
          </div>
        </aside>

        {/* Details */}
        <section className="lg:col-span-8 sheet">
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ink bg-saffron-soft">
            <h3 className="font-display font-bold text-xl">{isEditing ? 'Edit details' : 'Record details'}</h3>
            <button onClick={() => setIsEditing(!isEditing)} className="btn btn-sm btn-ink">
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="field-label">Full Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Department</label>
                    <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Class</label>
                    <input type="text" value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Roll No</label>
                    <input type="text" value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} className="field" />
                  </div>
                  <div>
                    <label className="field-label">Batch</label>
                    <input type="text" value={formData.batch} onChange={(e) => setFormData({ ...formData, batch: e.target.value })} className="field" />
                  </div>
                </div>

                <button type="submit" className="btn btn-moss">
                  Save Profile Changes
                </button>
              </form>
            ) : (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {details.map(([k, v]) => (
                  <div key={k} className="py-4 border-b-2 border-dashed border-ink/40">
                    <dt className="kicker">{k}</dt>
                    <dd className="font-display font-bold text-xl mt-1 truncate">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

      </div>

    </div>
  );
};

export default ProfilePage;
