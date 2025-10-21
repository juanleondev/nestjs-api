# Authentication Endpoints Usage Guide

This guide shows you how to use all the authentication endpoints in your NestJS API.

## 🚀 Quick Start

### 1. Start the Services

```bash
# Terminal 1: Start Firebase Emulator
npm run emulators

# Terminal 2: Start NestJS API
npm run dev
```

### 2. Create a Test User

**Option A: Using Emulator UI (Recommended)**
1. Go to http://localhost:4000
2. Click on "Authentication" tab
3. Click "Add user"
4. Enter email: `test@example.com`
5. Enter password: `password123`
6. Click "Add user"

**Option B: Using Test Script**
```bash
node test-emulator.js
```

## 📡 API Endpoints

### 1. POST /auth/login
Authenticate a user with email and password.

**Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "firebase-user-id",
    "email": "test@example.com",
    "emailVerified": true,
    "displayName": null,
    "photoURL": null
  },
  "expires_in": 3600
}
```

**JavaScript Example:**
```javascript
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log('Access Token:', data.access_token);
```

### 2. GET /auth/profile
Get the current user's profile (requires authentication).

**Request:**
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "uid": "firebase-user-id",
  "email": "test@example.com",
  "emailVerified": true,
  "displayName": null,
  "photoURL": null
}
```

**JavaScript Example:**
```javascript
const response = await fetch('http://localhost:3000/auth/profile', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const userProfile = await response.json();
console.log('User Profile:', userProfile);
```

### 3. POST /auth/verify
Verify a Firebase ID token.

**Request:**
```bash
curl -X POST http://localhost:3000/auth/verify \
  -H "Content-Type: application/json" \
  -d '{
    "token": "FIREBASE_ID_TOKEN"
  }'
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "uid": "firebase-user-id",
    "email": "test@example.com",
    "emailVerified": true,
    "displayName": null,
    "photoURL": null
  }
}
```

**JavaScript Example:**
```javascript
const response = await fetch('http://localhost:3000/auth/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: firebaseIdToken
  })
});

const verification = await response.json();
console.log('Token Valid:', verification.valid);
```

## 🧪 Testing with Different Tools

### Using Postman
1. Import the collection or create new requests
2. Set base URL to `http://localhost:3000`
3. For protected routes, add `Authorization: Bearer YOUR_TOKEN` header

### Using Insomnia
1. Create new requests for each endpoint
2. Set appropriate headers and body
3. Save tokens for reuse in protected requests

### Using curl
```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq -r '.access_token')

# Get profile
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

## 🔒 Protecting Your Own Routes

To protect any route in your application:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData(@Request() req) {
    // Access user data via req.user
    return {
      message: 'This is protected data',
      user: req.user
    };
  }
}
```

## 🚨 Error Handling

### Common Error Responses

**401 Unauthorized:**
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

**400 Bad Request:**
```json
{
  "statusCode": 400,
  "message": ["Email must be a valid email address"],
  "error": "Bad Request"
}
```

**403 Forbidden (Invalid Token):**
```json
{
  "statusCode": 401,
  "message": "Invalid token",
  "error": "Unauthorized"
}
```

### Error Handling in JavaScript

```javascript
try {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return data;
} catch (error) {
  console.error('Authentication failed:', error.message);
  throw error;
}
```

## 🧪 Automated Testing

Run the test script to verify all endpoints:

```bash
# Install axios if not already installed
npm install axios

# Run the test
node test-auth-endpoints.js
```

## 📱 Frontend Integration Examples

### React Example
```jsx
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      setToken(data.access_token);
      localStorage.setItem('token', data.access_token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const profile = await response.json();
    console.log('Profile:', profile);
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {token && <button onClick={getProfile}>Get Profile</button>}
    </form>
  );
}
```

### Vue.js Example
```vue
<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <button v-if="token" @click="getProfile">Get Profile</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      token: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        
        const data = await response.json();
        this.token = data.access_token;
        localStorage.setItem('token', data.access_token);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async getProfile() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const profile = await response.json();
      console.log('Profile:', profile);
    }
  }
};
</script>
```

## 🔧 Environment Configuration

Make sure your `.env` file has the correct settings:

```env
# For emulator development
NODE_ENV=development
USE_FIREBASE_EMULATOR=true
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=1h
PORT=3000
```

## 🎯 Next Steps

1. **Test the endpoints** using the provided examples
2. **Integrate with your frontend** using the JavaScript examples
3. **Protect your routes** by adding `@UseGuards(JwtAuthGuard)`
4. **Customize the authentication** flow as needed
5. **Deploy to production** with real Firebase credentials

The authentication system is now ready to use! 🚀
