// filepath: /home/nick/Projects/umts-hours/routes/noteRoutes.js
import express from 'express';
import * as noteController from '../controllers/noteController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// All note routes require authentication
router.use(isAuthenticated);

// Routes for managing notes
router.get('/', noteController.getAllNotes);
router.get('/user/:userId', noteController.getNotesByUserId);
router.get('/date/:date', noteController.getNotesByDate);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export default router;
