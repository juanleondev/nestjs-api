import { IsNotEmpty, IsString } from 'class-validator';

export class FirebaseTokenDto {
  @IsString({ message: 'Firebase ID token must be a string' })
  @IsNotEmpty({ message: 'Firebase ID token is required' })
  idToken: string;
}
