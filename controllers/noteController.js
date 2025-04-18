import db from '../models/index.js';
const { Note, User } = db;

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        }
      ]
    });
    return res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

// Get notes by user ID
export const getNotesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notes = await Note.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    return res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes by user ID:', error);
    return res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

// Get note by ID
export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findByPk(noteId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return res.status(500).json({ message: 'Error fetching note', error: error.message });
  }
};

// Get notes by date
export const getNotesByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const notes = await Note.findAll({
      where: { date },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    return res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes by date:', error);
    return res.status(500).json({ message: 'Error fetching notes by date', error: error.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { userId, date, content } = req.body;

    // Validate the request body
    if (!userId || !date) {
      return res.status(400).json({ message: 'UserId and date are required' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const note = await Note.create({
      userId,
      date,
      content: content || ''
    });

    // Fetch the created note with user information
    const createdNote = await Note.findByPk(note.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    return res.status(201).json(createdNote);
  } catch (error) {
    console.error('Error creating note:', error);
    return res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { content } = req.body;

    const note = await Note.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Only allow updating content, not userId or date
    await note.update({
      content: content || note.content
    });

    // Fetch updated note with user information
    const updatedNote = await Note.findByPk(noteId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        }
      ]
    });

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.destroy();
    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};
