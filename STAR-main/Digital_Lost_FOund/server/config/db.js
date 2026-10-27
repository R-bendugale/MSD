const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digital_lost_found', {
      serverSelectionTimeoutMS: 2000 // Quick fallback if local MongoDB service is not running
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}. Running in fallback in-memory database mode for instant preview.`);
    return false;
  }
};

module.exports = connectDB;
