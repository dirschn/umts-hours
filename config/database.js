import 'dotenv/config';

export default {
  development: {
    dialect: 'sqlite',
    storage: './database/development.sqlite',
    logging: console.log,
  },
  test: {
    dialect: 'sqlite',
    storage: './database/test.sqlite',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  },
};
