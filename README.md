# UMTS Hours

A comprehensive hours tracking application built with Node.js/Express backend and Angular frontend.

## Project Overview

UMTS Hours is designed to track employee shifts and provide detailed reporting capabilities. The application consists of:

- **Backend**: Node.js/Express API with Sequelize ORM
- **Frontend**: Angular 19 with Material UI components
- **Database**: SQLite (development) and MySQL/MariaDB (production)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14+ recommended)
- npm (v6+ recommended)
- Angular CLI (`npm install -g @angular/cli`)
- MySQL/MariaDB (for production deployment only)
- PM2 (for production deployment)

## Clone the Repository

```bash
git clone https://github.com/dirschn/umts-hours.git
cd umts-hours
```

## Development Environment

### Backend Setup

1. Install backend dependencies:
   ```bash
   npm install
   ```

2. Copy the example environment file and update it with your settings:
   ```bash
   cp .env.example .env
   ```
   Then edit the .env file with appropriate values for development:
   ```
   NODE_ENV=development
   PORT=3000
   SESSION_SECRET=your_session_secret_here
   ```

3. Run database migrations:
   ```bash
   npm run migrate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Production Environment

### Database Setup

1. Create a production database:
   ```sql
   CREATE DATABASE umts_hours;
   ```

2. Run database migrations:
   ```bash
   npm run migrate
   ```

### Backend Configuration

1. Copy the example environment file and update it with your production settings:
   ```bash
   cp env.example .env
   ```
   Then edit the .env file with appropriate values for production:
   ```
   NODE_ENV=production
   PORT=3000
   SESSION_SECRET=your_secure_session_secret
   CLIENT_ORIGIN=https://your-production-domain.com

   # Database configuration
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_DATABASE=umts_hours
   DB_HOST=localhost
   DB_DIALECT=mariadb
   ```

2. Install PM2 globally if not already installed:
   ```bash
   npm install -g pm2
   ```

### Frontend Build

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Build the production version of the frontend:
   ```bash
   npm run build
   ```

3. The build artifacts will be stored in the `frontend/dist/` directory

### Deployment

1. Start the application with PM2:
   ```bash
   npm run pm2:start
   ```

2. Other PM2 commands available:
   ```bash
   npm run pm2:stop      # Stop the application
   npm run pm2:restart   # Restart the application
   npm run pm2:delete    # Remove the application from PM2
   npm run pm2:logs      # View application logs
   npm run pm2:status    # Check application status
   ```

3. Configure a web server (like Nginx or Apache) to:
   - Serve the Angular frontend from the `frontend/dist/` directory
   - Proxy API requests to the backend running on your configured port

## Project Structure

```
umts-hours/
├── app.js                    # Main application entry point
├── config/                   # Configuration files
│   ├── database.js           # Database configuration
│   └── session.js            # Session configuration
├── controllers/              # Route controllers
├── middleware/               # Express middleware
├── migrations/               # Sequelize migrations
├── models/                   # Sequelize models
├── routes/                   # Express routes
└── frontend/                 # Angular frontend application
    ├── src/
    │   ├── app/              # Angular components
    │   ├── assets/           # Static assets
    │   └── environments/     # Environment configuration
    └── dist/                 # Production build output
```

## Scripts

### Backend Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon
- `npm run migrate`: Run database migrations
- `npm run pm2:start`: Start the application with PM2
- `npm run pm2:stop`: Stop the PM2 application
- `npm run pm2:restart`: Restart the PM2 application
- `npm run pm2:delete`: Delete the PM2 application
- `npm run pm2:logs`: View PM2 logs
- `npm run pm2:status`: Check PM2 status

### Frontend Scripts

- `npm start`: Start the development server
- `npm run build`: Build the application for production
- `npm run watch`: Build and watch for changes
- `npm run test`: Run unit tests

## License

ISC

## Author

Nick Dirschel
