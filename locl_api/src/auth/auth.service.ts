import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseConfig } from '../config/firebase.config';
import { LoginDto } from './dto/login.dto';
import { FirebaseTokenDto } from './dto/firebase-token.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private firebaseConfig: FirebaseConfig,
  ) {}

  async loginWithFirebaseToken(
    firebaseTokenDto: FirebaseTokenDto,
  ): Promise<AuthResponseDto> {
    try {
      // Verify the Firebase ID token using Admin SDK
      const decodedToken = await this.firebaseConfig
        .getAdminAuth()
        .verifyIdToken(firebaseTokenDto.idToken);

      // Create a custom JWT token with Firebase user data
      const payload = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
        token: firebaseTokenDto.idToken, // Include Firebase ID token
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
        user: {
          uid: decodedToken.uid,
          email: decodedToken.email || '',
          emailVerified: decodedToken.email_verified,
          displayName: decodedToken.name || undefined,
          photoURL: decodedToken.picture || undefined,
        },
        expires_in: 3600, // 1 hour in seconds
      };
    } catch (error) {
      if (error.code === 'auth/id-token-expired') {
        throw new UnauthorizedException('Firebase ID token has expired');
      }

      if (error.code === 'auth/id-token-revoked') {
        throw new UnauthorizedException('Firebase ID token has been revoked');
      }

      if (error.code === 'auth/invalid-id-token') {
        throw new UnauthorizedException('Invalid Firebase ID token');
      }

      throw new UnauthorizedException('Invalid Firebase ID token');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      // Using Admin SDK to verify user credentials
      // First, get the user by email to check if they exist
      const userRecord = await this.firebaseConfig
        .getAdminAuth()
        .getUserByEmail(loginDto.email);

      if (!userRecord) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // For password verification, we need to use a different approach
      // The Admin SDK doesn't have a direct password verification method
      // We'll use the REST API to verify the password
      const passwordVerified = await this.verifyPasswordWithRestAPI(
        loginDto.email,
        loginDto.password,
      );

      if (!passwordVerified) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Create a custom JWT token with user data
      const payload = {
        uid: userRecord.uid,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        token: `admin-verified-${userRecord.uid}`, // Custom token identifier
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        access_token: accessToken,
        user: {
          uid: userRecord.uid,
          email: userRecord.email || '',
          emailVerified: userRecord.emailVerified,
          displayName: userRecord.displayName || undefined,
          photoURL: userRecord.photoURL || undefined,
        },
        expires_in: 3600, // 1 hour in seconds
      };
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        throw new UnauthorizedException('Invalid email or password');
      }

      if (error.code === 'auth/user-disabled') {
        throw new UnauthorizedException('User account has been disabled');
      }

      throw new UnauthorizedException('Authentication failed');
    }
  }

  private async verifyPasswordWithRestAPI(
    email: string,
    password: string,
  ): Promise<boolean> {
    try {
      // Use Firebase REST API to verify password
      const isEmulator =
        this.configService.get<string>('NODE_ENV') === 'development' &&
        this.configService.get<string>('USE_FIREBASE_EMULATOR') === 'true';

      const apiKey = isEmulator
        ? 'demo-key'
        : this.configService.get<string>('FIREBASE_API_KEY');

      const baseUrl = isEmulator
        ? 'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-api-key'
        : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return !!data.idToken; // Return true if we got an ID token
      }

      return false;
    } catch (error) {
      console.error('Password verification failed:', error);
      return false;
    }
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.firebaseConfig
        .getAdminAuth()
        .verifyIdToken(token);

      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
