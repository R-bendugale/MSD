const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect Database & Initialize Seed Data if needed
const User = require('./models/User');
const Item = require('./models/Item');
const Claim = require('./models/Claim');
const Notification = require('./models/Notification');
const { seedUsers, seedItems, seedClaims, seedNotifications } = require('./utils/seedData');

connectDB().then(async (isDbConnected) => {
  if (isDbConnected) {
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('Seeding initial MongoDB database data...');
        const bcrypt = require('bcryptjs');
        for (const u of seedUsers) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(u.password, salt);
          await User.create({ ...u, password: hashPassword });
        }
        await Item.insertMany(seedItems);
        await Claim.insertMany(seedClaims);
        await Notification.insertMany(seedNotifications);
        console.log('Database seeded successfully with initial sample records!');
      }
    } catch (err) {
      console.error('Error during auto database seed:', err.message);
    }
  }
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Digital Lost and Found Management System API is running smoothly!',
    college: 'D. Y. Patil College of Engineering & Technology, Kolhapur',
    version: '1.0.0'
  });
});

// Serve frontend build if available in production mode
if (process.env.NODE_ENV === 'production' || fs.existsSync(path.join(__dirname, '../client/dist'))) {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
