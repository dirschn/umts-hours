import db from '../models/index.js';
const { User } = db;

// User registration
export const register = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    if (email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already in use' });
      }
    }

    // Create new user - password will be hashed by the beforeCreate hook in the User model
    const user = await User.create({
      username,
      password,
      email: email || null,
      name: name || username
    });

    // Store user info in session
    req.session.userId = user.id;
    req.session.username = user.username;

    // Don't include password in the response
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Error during registration', error: error.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Store user info in session
    req.session.userId = user.id;
    req.session.username = user.username;

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Get current user from session
export const getCurrentUser = async (req, res) => {
  try {
    // The userId should be in the session if the user is logged in
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      // Clear invalid session
      req.session.destroy();
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    return res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

// Logout - destroy the session
export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err.message });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid');

    return res.status(200).json({ message: 'Logout successful' });
  });
};

// Check if user is authenticated
export const checkAuth = (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ authenticated: true });
  } else {
    return res.status(200).json({ authenticated: false });
  }
};
