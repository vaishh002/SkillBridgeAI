require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const roadmapRoutes = require('./routes/roadmap');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'https://skill-bridge-ai-theta.vercel.app'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Routes ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/roadmap', roadmapRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 SkillBridge AI API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

// ─── Database + Server ────────────────────────────────────────
const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5s timeout
    });
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (err) {
    console.warn('⚠️ MongoDB Atlas connection failed:', err.message);
    try {
      console.log('🔄 Attempting local MongoDB connection (mongodb://127.0.0.1:27017/skillbridge)...');
      await mongoose.connect('mongodb://127.0.0.1:27017/skillbridge', {
        serverSelectionTimeoutMS: 3000 // 3s timeout
      });
      console.log('✅ Local MongoDB connected successfully');
    } catch (localErr) {
      console.warn('❌ Local MongoDB connection also failed:', localErr.message);
      console.warn('⚠️ Starting in offline MOCK database mode (JSON file fallback)...');
      global.useMockDb = true;
      mongoose.set('bufferCommands', false);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 SkillBridge AI Server running on http://localhost:${PORT}`);
    console.log(`📋 API Health: http://localhost:${PORT}/api/health`);
    if (global.useMockDb) {
      console.log('📁 Mock Database active: backend/data/mock_users.json');
    }
  });
};

connectDB();
