import db from '../models/index.js';
const { Shift, User } = db;

// Get all shifts
export const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'username']
        }
      ]
    });
    return res.status(200).json(shifts);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    return res.status(500).json({ message: 'Error fetching shifts', error: error.message });
  }
};

// Get shifts by user ID
export const getShiftsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const shifts = await Shift.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    return res.status(200).json(shifts);
  } catch (error) {
    console.error('Error fetching shifts by user ID:', error);
    return res.status(500).json({ message: 'Error fetching shifts', error: error.message });
  }
};

// Get shift by ID
export const getShiftById = async (req, res) => {
  try {
    const shiftId = req.params.id;

    const shift = await Shift.findByPk(shiftId, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    return res.status(200).json(shift);
  } catch (error) {
    console.error('Error fetching shift:', error);
    return res.status(500).json({ message: 'Error fetching shift', error: error.message });
  }
};

// Create a new shift
export const createShift = async (req, res) => {
  try {
    const { name, start, end, userId } = req.body;

    // Validate the request body
    if (!start || !end || !userId) {
      return res.status(400).json({ message: 'Start time, end time, and userId are required' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate that end time is after start time
    const startTime = new Date(start);
    const endTime = new Date(end);

    if (endTime <= startTime) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    const shift = await Shift.create({
      name: name || 'Programmer', // Using default from model if not specified
      start: startTime,
      end: endTime,
      userId
    });

    return res.status(201).json(shift);
  } catch (error) {
    console.error('Error creating shift:', error);
    return res.status(500).json({ message: 'Error creating shift', error: error.message });
  }
};

// Update a shift
export const updateShift = async (req, res) => {
  try {
    const shiftId = req.params.id;
    const { name, start, end, userId } = req.body;

    const shift = await Shift.findByPk(shiftId);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    // If userId is being changed, check if new user exists
    if (userId && userId !== shift.userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    // If both start and end times are provided, validate that end is after start
    if (start && end) {
      const startTime = new Date(start);
      const endTime = new Date(end);

      if (endTime <= startTime) {
        return res.status(400).json({ message: 'End time must be after start time' });
      }
    }

    await shift.update({
      name: name || shift.name,
      start: start ? new Date(start) : shift.start,
      end: end ? new Date(end) : shift.end,
      userId: userId || shift.userId
    });

    // Fetch updated shift with user information
    const updatedShift = await Shift.findByPk(shiftId, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    return res.status(200).json(updatedShift);
  } catch (error) {
    console.error('Error updating shift:', error);
    return res.status(500).json({ message: 'Error updating shift', error: error.message });
  }
};

// Delete a shift
export const deleteShift = async (req, res) => {
  try {
    const shiftId = req.params.id;

    const shift = await Shift.findByPk(shiftId);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }

    await shift.destroy();
    return res.status(200).json({ message: 'Shift deleted successfully' });
  } catch (error) {
    console.error('Error deleting shift:', error);
    return res.status(500).json({ message: 'Error deleting shift', error: error.message });
  }
};
