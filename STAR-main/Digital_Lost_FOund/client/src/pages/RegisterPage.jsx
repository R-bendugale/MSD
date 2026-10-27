import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, User, Mail, Lock, BookOpen, GraduationCap, Hash, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    department: 'CSE',
    className: 'B.Tech',
    rollNo: '',
    batch: 'B2',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    const res = await register(formData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">

      {/* Left panel — plum */}
      <aside className="lg:col-span-4 bg-plum text-card p-8 sm:p-12 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-ink relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-72 h-72 border-[3px] border-card/20 rotate-45" />
        <div className="absolute right-6 bottom-32 hazard w-24 h-6 border-2 border-ink -rotate-12" />

        <Link to="/" className="relative flex items-center gap-3">
          <span className="w-10 h-10 bg-saffron text-ink border-2 border-ink flex items-center justify-center -rotate-3">
            <Compass className="w-5 h-5" />
          </span>
          <span className="font-display italic font-extrabold text-2xl">Lost &amp; Found Portal</span>
        </Link>

        <div className="relative my-12">
          <h3 className="font-display font-extrabold text-5xl leading-[0.95]">
            Join Our <span className="italic text-saffron">Community</span>
          </h3>
          <p className="mt-5 text-card/80 leading-relaxed">
            Help others and keep track of your belongings across DYPCET campus safely.
          </p>
        </div>

        <p className="relative kicker !text-card/70 border-t-2 border-card/40 pt-4">
          DYPCET Digital Lost & Found Portal
        </p>
      </aside>

      {/* Form */}
      <main className="lg:col-span-8 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-2xl sheet p-6 sm:p-10">
          <p className="kicker">— New member</p>
          <h2 className="font-display font-extrabold text-4xl leading-none mt-2">Create Account</h2>
          <p className="text-ink-soft text-sm mt-2 mb-7">Fill in your details to get started on campus portal</p>

          {error && (
            <div className="mb-5 bg-clay-soft border-2 border-clay text-clay font-mono text-xs p-3">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="field-label">Full Name</label>
              <div className="relative">
                <User className="field-ico" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Shweta Tanaji Kolekar"
                  value={formData.name}
                  onChange={handleChange}
                  className="field field-icon"
                />
              </div>
            </div>

            {/* Department & Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="field-label">Department</label>
                <div className="relative">
                  <BookOpen className="field-ico" />
                  <select name="department" value={formData.department} onChange={handleChange} className="field field-icon">
                    <option value="CSE">CSE</option>
                    <option value="ETC">ETC</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="field-label">Class</label>
                <div className="relative">
                  <GraduationCap className="field-ico" />
                  <select name="className" value={formData.className} onChange={handleChange} className="field field-icon">
                    <option value="B.Tech">B.Tech</option>
                    <option value="T.Y.">T.Y.</option>
                    <option value="S.Y.">S.Y.</option>
                    <option value="F.Y.">F.Y.</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Roll No & Batch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="field-label">Roll No</label>
                <div className="relative">
                  <Hash className="field-ico" />
                  <input
                    type="text"
                    name="rollNo"
                    required
                    placeholder="e.g. 29"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="field field-icon"
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Batch</label>
                <div className="relative">
                  <Layers className="field-ico" />
                  <input
                    type="text"
                    name="batch"
                    required
                    placeholder="e.g. B2"
                    value={formData.batch}
                    onChange={handleChange}
                    className="field field-icon"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="field-label">Email address</label>
              <div className="relative">
                <Mail className="field-ico" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="student@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="field field-icon"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="field-label">Password</label>
                <div className="relative">
                  <Lock className="field-ico" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="field field-icon"
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Confirm Password</label>
                <div className="relative">
                  <Lock className="field-ico" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="field field-icon"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-ink btn-block !py-3.5">
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-ink underline underline-offset-4 decoration-2 decoration-saffron hover:bg-saffron">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
