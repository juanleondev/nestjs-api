import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseConfig {
  private adminApp: admin.app.App;

  constructor(private configService: ConfigService) {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    const isEmulator = this.configService.get<string>('NODE_ENV') === 'development' && 
                      this.configService.get<string>('USE_FIREBASE_EMULATOR') === 'true';

    // Set emulator environment variable before initializing Firebase
    if (isEmulator) {
      process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
    }

    // Initialize Firebase Admin SDK only
    if (admin.apps.length === 0) {
      if (isEmulator) {
        // Use emulator configuration
        this.adminApp = admin.initializeApp({
          projectId: 'locl-dev-api-5d47c',
        });
      } else {
        // Use production configuration
        const serviceAccount = {
          type: 'service_account',
          project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          private_key_id: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
          private_key: this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
          client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          client_id: this.configService.get<string>('FIREBASE_CLIENT_ID'),
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${this.configService.get<string>('FIREBASE_CLIENT_EMAIL')}`,
        };

        this.adminApp = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        });
      }
    } else {
      this.adminApp = admin.app();
    }
  }

  getAdminApp(): admin.app.App {
    return this.adminApp;
  }

  getAdminAuth(): admin.auth.Auth {
    return this.adminApp.auth();
  }
}
