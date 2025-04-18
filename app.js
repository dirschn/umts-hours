import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import initSession from './config/session.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import shiftRoutes from './routes/shiftRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN || 'http://localhost:4200' // Angular default port
    : 'http://localhost:4200',
  credentials: true // Important for cookies/sessions
}));

// Make db available to route handlers
app.locals.db = db;

// Initialize session management
initSession(app);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/notes', noteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
