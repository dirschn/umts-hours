// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  // Check if session contains userId
  if (req.session && req.session.userId) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    // User is not authenticated
    res.status(401).json({ message: 'Authentication required' });
  }
};

// Optional authentication middleware
export const optionalAuth = (req, res, next) => {
  // This middleware won't block unauthenticated requests
  // It just checks for a session and passes through either way
  if (req.session && req.session.userId) {
    req.isAuthenticated = true;
  } else {
    req.isAuthenticated = false;
  }

  next();
};

// Role-based authorization middleware
export const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    // This middleware assumes isAuthenticated has run first
    const { db } = req.app.locals;
    const { User } = db;

    try {
      const userId = req.session.userId;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const userRole = user.role || 'user'; // Default to 'user' if no role specified

      if (allowedRoles.includes(userRole)) {
        next(); // User has permission
      } else {
        res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({ message: 'Server error during authorization' });
    }
  };
};
