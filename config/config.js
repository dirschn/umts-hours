import 'dotenv/config';
import databaseConfig from './database.js';

/**
 * Config class that provides a unified way to access application configuration
 * from anywhere in the backend.
 */
class Config {
  constructor() {
    this.env = process.env.NODE_ENV || 'development';

    // Database configuration
    this.database = databaseConfig[this.env];

    // Server configuration
    this.server = {
      port: parseInt(process.env.PORT, 10) || 3000,
      host: process.env.HOST || 'localhost',
      apiPrefix: process.env.API_PREFIX || '/api'
    };

    // Session configuration
    this.session = {
      secret: process.env.SESSION_SECRET || 'your-secret-key-should-be-in-env',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: this.env === 'production',
      name: 'umts.sid'
    };

    // Authentication configuration
    this.auth = {
      tokenExpiration: '1d',
      saltRounds: 10
    };

    // Logging configuration
    this.logging = {
      level: this.env === 'production' ? 'info' : 'debug',
      silent: this.env === 'test'
    };
  }

  /**
   * Get configuration by path using dot notation
   * Example: config.get('server.port')
   */
  get(path) {
    if (!path) return undefined;

    const properties = path.split('.');
    let result = this;

    for (const prop of properties) {
      if (result && typeof result === 'object' && prop in result) {
        result = result[prop];
      } else {
        return undefined;
      }
    }

    return result;
  }

  /**
   * Check if we're in development environment
   */
  isDevelopment() {
    return this.env === 'development';
  }

  /**
   * Check if we're in production environment
   */
  isProduction() {
    return this.env === 'production';
  }

  /**
   * Check if we're in test environment
   */
  isTest() {
    return this.env === 'test';
  }
}

// Export a singleton instance
const config = new Config();
export default config;
