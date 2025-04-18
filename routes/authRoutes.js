import express from 'express';
import * as authController from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes - no authentication required
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check', authController.checkAuth);

// Protected routes - require authentication
router.get('/me', isAuthenticated, authController.getCurrentUser);
router.post('/logout', isAuthenticated, authController.logout);

export default router;
