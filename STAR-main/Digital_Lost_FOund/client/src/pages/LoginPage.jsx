import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, CheckCircle, UserCheck, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, switchAccount } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials provided');
    }
  };

  const handleQuickLogin = (role) => {
    switchAccount(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">

      {/* Left — moss panel */}
      <aside className="lg:col-span-5 bg-moss text-card p-8 sm:p-12 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-ink relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border-[28px] border-saffron/30" />
        <div className="absolute -left-10 bottom-24 w-40 h-40 border-2 border-card/30 rotate-12" />

        <Link to="/" className="relative flex items-center gap-3">
          <span className="w-10 h-10 bg-saffron text-ink border-2 border-ink flex items-center justify-center rotate-3">
            <Compass className="w-5 h-5" />
          </span>
          <span className="font-display italic font-extrabold text-2xl">Lost &amp; Found Portal</span>
        </Link>

        <div className="relative my-12">
          <span className="chip chip-saffron">DYPCET Campus</span>
          <h3 className="font-display font-extrabold text-5xl sm:text-6xl leading-[0.95] mt-5">
            Find what <span className="italic text-saffron">matters</span>
          </h3>
          <p className="mt-5 text-card/80 max-w-sm leading-relaxed">
            Lost & Found helps all campus students reconnect with their belongings quickly and securely.
          </p>

          <ul className="mt-8 space-y-3 max-w-sm">
            <li className="flex items-center gap-3 border-2 border-card/60 p-3 text-sm">
              <CheckCircle className="w-4 h-4 text-saffron shrink-0" />
              <span>Real-time claim updates & notifications</span>
            </li>
            <li className="flex items-center gap-3 border-2 border-card/60 p-3 text-sm">
              <CheckCircle className="w-4 h-4 text-saffron shrink-0" />
              <span>Verified admin approvals for safety</span>
            </li>
          </ul>
        </div>

        <p className="relative kicker !text-card/70 border-t-2 border-card/40 pt-4">
          D. Y. Patil College of Engineering & Technology, Kolhapur
        </p>
      </aside>

      {/* Right — form */}
      <main className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <p className="kicker">— Sign in</p>
          <h2 className="font-display font-extrabold text-5xl leading-none mt-2">Welcome Back!</h2>
          <p className="text-ink-soft mt-3 mb-8">Login with your student or staff email to manage items</p>

          {error && (
            <div className="mb-5 bg-clay-soft border-2 border-clay text-clay font-mono text-xs p-3">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="field-label">Email address</label>
              <div className="relative">
                <Mail className="field-ico" />
                <input
                  type="email"
                  required
                  placeholder="Enter your student email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field field-icon"
                />
              </div>
            </div>

            <div>
              <label className="field-label">Password</label>
              <div className="relative">
                <Lock className="field-ico" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field field-icon"
                />
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#2d5a3d]"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered student email'); }}
                className="underline underline-offset-4 decoration-2 decoration-clay hover:text-clay"
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-ink btn-block !py-3.5">
              Login
            </button>
          </form>

          {/* Quick Demo Login Buttons */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-ink">
            <p className="kicker text-center mb-3">Quick Demo Portal Access</p>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => handleQuickLogin('user')} className="btn btn-moss">
                <UserCheck className="w-4 h-4" />
                <span>Student Login</span>
              </button>
              <button type="button" onClick={() => handleQuickLogin('admin')} className="btn btn-saffron">
                <KeyRound className="w-4 h-4" />
                <span>Campus Admin</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-ink-soft">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-ink underline underline-offset-4 decoration-2 decoration-saffron hover:bg-saffron">
              Register here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
