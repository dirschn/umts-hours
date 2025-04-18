// filepath: /home/nick/Projects/umts-hours/routes/shiftRoutes.js
import express from 'express';
import * as shiftController from '../controllers/shiftController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// All shift routes require authentication
router.use(isAuthenticated);

// Routes for managing shifts
router.get('/', shiftController.getAllShifts);
router.get('/user/:userId', shiftController.getShiftsByUserId);
router.get('/:id', shiftController.getShiftById);
router.post('/', shiftController.createShift);
router.put('/:id', shiftController.updateShift);
router.delete('/:id', shiftController.deleteShift);

export default router;
