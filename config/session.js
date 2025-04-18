import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import db from '../models/index.js';
import config from './config.js';

// Create a store for our sessions using Sequelize
const SequelizeStoreInstance = SequelizeStore(session.Store);

// Configure session store
const sessionStore = new SequelizeStoreInstance({
  db: db.sequelize,
  tableName: 'sessions',
  checkExpirationInterval: 15 * 60 * 1000, // Check every 15 minutes for expired sessions
  expiration: config.session.maxAge
});

// Configure session options
const sessionConfig = {
  secret: config.session.secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.session.secure,
    httpOnly: true,
    maxAge: config.session.maxAge
  },
  name: config.session.name
};

// Create and export a function to initialize the session
export const initSession = (app) => {
  // Use the session middleware
  app.use(session(sessionConfig));

  // Create session table if it doesn't exist
  sessionStore.sync();

  return app;
};

export default initSession;
