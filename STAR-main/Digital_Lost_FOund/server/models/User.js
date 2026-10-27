const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, default: 'CSE' },
  className: { type: String, default: 'B.Tech' },
  rollNo: { type: String, default: '29' },
  batch: { type: String, default: 'B2' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  joinedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
