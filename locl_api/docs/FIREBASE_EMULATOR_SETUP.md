# Firebase Emulator Setup Guide

This guide shows you how to use Firebase emulators for local development and testing.

## Quick Start

### 1. Environment Variables for Emulators

Create a `.env` file with these variables for emulator development:

```env
# Development Environment with Firebase Emulators
NODE_ENV=development
USE_FIREBASE_EMULATOR=true

# Database Configuration (your existing DB)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-for-development
JWT_EXPIRATION=1h

# Application Configuration
PORT=3000

# Firebase Emulator Configuration (dummy values - no real credentials needed)
FIREBASE_PROJECT_ID=demo-project
FIREBASE_API_KEY=demo-key
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 2. Start Firebase Emulators

```bash
# Start only Auth emulator
npm run emulators

# Start Auth emulator (UI is automatically enabled)
npm run emulators:ui
```

### 3. Start Your NestJS Application

```bash
# In a separate terminal
npm run dev
```

## Available Scripts

- `npm run emulators` - Start Firebase Auth emulator
- `npm run emulators:ui` - Start emulator with web UI
- `npm run emulators:export` - Export emulator data
- `npm run emulators:import` - Import emulator data

## Emulator URLs

- **Auth Emulator**: http://localhost:9099
- **Emulator UI**: http://localhost:4000
- **Your API**: http://localhost:3000

## Testing Authentication

### 1. Create Test Users

You can create test users in two ways:

#### Option A: Using Emulator UI
1. Go to http://localhost:4000
2. Navigate to Authentication tab
3. Click "Add user" to create test users

#### Option B: Using API
```bash
# Create a test user via API
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### 2. Test Authentication Endpoints

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Get profile (replace YOUR_TOKEN with actual token)
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Verify token
curl -X POST http://localhost:3000/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_FIREBASE_ID_TOKEN"}'
```

## Emulator Data Persistence

### Export Data
```bash
npm run emulators:export
```
This saves emulator data to `./emulator-data/` directory.

### Import Data
```bash
npm run emulators:import
```
This loads previously exported data.

## Configuration Details

### Firebase Configuration
The app automatically detects emulator mode when:
- `NODE_ENV=development`
- `USE_FIREBASE_EMULATOR=true`

### Emulator Ports
- Auth Emulator: 9099
- Emulator UI: 4000
- Your API: 3000

### Project ID
The emulator uses `demo-project` as the project ID, which is safe for development.

## Benefits of Using Emulators

1. **No Real Firebase Project Needed** - Develop without setting up a real Firebase project
2. **Fast Development** - No network latency
3. **Data Persistence** - Export/import data for consistent testing
4. **Cost-Free** - No Firebase usage charges
5. **Offline Development** - Works without internet connection
6. **Easy Testing** - Reset data easily between tests

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill processes on ports 9099 and 4000
   lsof -ti:9099 | xargs kill -9
   lsof -ti:4000 | xargs kill -9
   ```

2. **Emulator Not Starting**
   ```bash
   # Make sure Firebase CLI is installed
   firebase --version
   
   # Login to Firebase (required even for emulators)
   firebase login
   ```

3. **App Not Connecting to Emulator**
   - Check that `USE_FIREBASE_EMULATOR=true` in your `.env`
   - Ensure emulator is running on port 9099
   - Check console for connection errors

### Debug Mode

To see detailed emulator logs:
```bash
firebase emulators:start --only auth --debug
```

## Production vs Development

The app automatically switches between emulator and production based on environment variables:

- **Development**: Uses Firebase emulators
- **Production**: Uses real Firebase project

No code changes needed when deploying to production!
