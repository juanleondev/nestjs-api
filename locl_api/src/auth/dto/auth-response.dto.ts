export class AuthResponseDto {
  access_token: string;
  user: {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
  };
  expires_in: number;
}
