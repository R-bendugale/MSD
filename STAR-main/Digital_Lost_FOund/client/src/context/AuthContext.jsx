import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Generic demo student account if requested
  const demoStudentUser = {
    _id: '60d0fe4f5311236168a109ca',
    name: 'Student User',
    email: 'student@dypcet.ac.in',
    department: 'CSE',
    className: 'B.Tech',
    rollNo: '01',
    batch: 'B1',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    joinedDate: new Date().toISOString()
  };

  // Only one Admin user as requested
  const adminUser = {
    _id: '60d0fe4f5311236168a109cd',
    name: 'Campus Admin',
    email: 'admin@dypcet.ac.in',
    department: 'Administration',
    className: 'Staff',
    rollNo: 'ADM-01',
    batch: 'ADM',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    joinedDate: '2025-01-01'
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('dypcet_user');
    return savedUser ? JSON.parse(savedUser) : demoStudentUser;
  });

  const [token, setToken] = useState(() => localStorage.getItem('dypcet_token') || 'mock_jwt_token');

  useEffect(() => {
    if (user) {
      localStorage.setItem('dypcet_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dypcet_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('dypcet_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('dypcet_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data);
      setToken(res.data.token);
      return { success: true };
    } catch (err) {
      // Fallback for demo mode
      if (email === 'admin@dypcet.ac.in') {
        setUser(adminUser);
        setToken('mock_admin_token');
      } else {
        const loggedUser = {
          _id: 'user_' + Date.now(),
          name: email ? email.split('@')[0].replace('.', ' ').toUpperCase() : 'Student User',
          email: email || 'student@dypcet.ac.in',
          department: 'Computer Science',
          className: 'B.Tech',
          rollNo: '12',
          batch: 'B1',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          joinedDate: new Date().toISOString()
        };
        setUser(loggedUser);
        setToken('mock_student_token');
      }
      return { success: true };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      setUser(res.data);
      setToken(res.data.token);
      return { success: true };
    } catch (err) {
      const newUser = {
        _id: 'user_' + Date.now(),
        name: userData.name || 'New Student',
        email: userData.email,
        department: userData.department || 'CSE',
        className: userData.className || 'B.Tech',
        rollNo: userData.rollNo || '00',
        batch: userData.batch || 'A1',
        role: userData.email?.includes('admin') ? 'admin' : 'user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        joinedDate: new Date().toISOString()
      };
      setUser(newUser);
      setToken('mock_token_' + Date.now());
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('dypcet_user');
    localStorage.removeItem('dypcet_token');
  };

  const switchAccount = (role) => {
    if (role === 'admin') {
      setUser(adminUser);
      setToken('mock_admin_token');
    } else {
      setUser(demoStudentUser);
      setToken('mock_jwt_token');
    }
  };

  const updateProfile = (updatedData) => {
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem('dypcet_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, switchAccount, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
