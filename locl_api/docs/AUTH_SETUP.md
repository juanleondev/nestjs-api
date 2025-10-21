# Firebase Authentication Setup

This NestJS API now includes Firebase Authentication with JWT token support. Users can authenticate using email and password, and receive a JWT token for accessing protected routes.

## Features

- ✅ Email/Password authentication using Firebase Auth
- ✅ JWT token generation and validation
- ✅ Protected routes with JWT guards
- ✅ User profile endpoint
- ✅ Token verification endpoint
- ✅ Proper error handling and validation

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Firebase Configuration (Admin SDK)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id

# Firebase Configuration (Client SDK)
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=1h
```

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project or create a new one
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key" to download the service account JSON
5. Extract the values from the JSON file and add them to your `.env` file
6. Go to Project Settings > General > Your apps
7. Add a web app if you haven't already, and copy the Firebase config values
8. Add the client SDK configuration values to your `.env` file
9. Enable Email/Password authentication in Firebase Console > Authentication > Sign-in method

## API Endpoints

### POST /auth/login
Authenticate a user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "firebase-user-id",
    "email": "user@example.com",
    "emailVerified": true,
    "displayName": "John Doe",
    "photoURL": "https://example.com/photo.jpg"
  },
  "expires_in": 3600
}
```

### GET /auth/profile
Get the current user's profile (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "uid": "firebase-user-id",
  "email": "user@example.com",
  "emailVerified": true,
  "displayName": "John Doe",
  "photoURL": "https://example.com/photo.jpg"
}
```

### POST /auth/verify
Verify a Firebase ID token.

**Request Body:**
```json
{
  "token": "firebase-id-token"
}
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "uid": "firebase-user-id",
    "email": "user@example.com",
    "emailVerified": true,
    "displayName": "John Doe",
    "photoURL": "https://example.com/photo.jpg"
  }
}
```

## Protecting Routes

To protect any route in your application, use the `JwtAuthGuard`:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData(@Request() req) {
    // Access user data via req.user
    return { message: 'This is protected data', user: req.user };
  }
}
```

## Error Handling

The authentication system includes comprehensive error handling:

- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Invalid credentials or expired token
- **422 Unprocessable Entity**: Validation errors

Common error responses:
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

## Testing the API

1. Start the application:
   ```bash
   npm run dev
   ```

2. Test login endpoint:
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "password123"}'
   ```

3. Test protected endpoint:
   ```bash
   curl -X GET http://localhost:3000/auth/profile \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
   ```

## Security Notes

- JWT tokens are signed with a secret key
- Tokens have configurable expiration time
- Firebase ID tokens are verified on each request
- Input validation is enforced on all endpoints
- Passwords are handled securely by Firebase Auth

## File Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── auth-response.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
└── config/
    └── firebase.config.ts
```
