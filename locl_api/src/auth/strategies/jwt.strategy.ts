import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseConfig } from '../../config/firebase.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private firebaseConfig: FirebaseConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    try {
      // Check if this is a Firebase ID token or a custom admin-verified token
      if (payload.token && payload.token.startsWith('admin-verified-')) {
        // This is a custom JWT token from the login endpoint
        // The payload already contains the user data, just return it
        return {
          uid: payload.uid,
          email: payload.email,
          emailVerified: payload.emailVerified,
          displayName: payload.displayName,
          photoURL: payload.photoURL,
        };
      } else if (payload.token) {
        // This is a Firebase ID token from the firebase-token endpoint
        // Verify it with Firebase Admin SDK
        const decodedToken = await this.firebaseConfig
          .getAdminAuth()
          .verifyIdToken(payload.token);

        return {
          uid: decodedToken.uid,
          email: decodedToken.email,
          emailVerified: decodedToken.email_verified,
          displayName: decodedToken.name,
          photoURL: decodedToken.picture,
        };
      } else {
        // Fallback: if no token field, assume the payload itself contains user data
        return {
          uid: payload.uid,
          email: payload.email,
          emailVerified: payload.emailVerified,
          displayName: payload.displayName,
          photoURL: payload.photoURL,
        };
      }
    } catch (error) {
      console.error('JWT validation error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
