import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { FirebaseTokenDto } from './dto/firebase-token.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('login-with-token')
  @HttpCode(HttpStatus.OK)
  async loginWithFirebaseToken(
    @Body() firebaseTokenDto: FirebaseTokenDto,
  ): Promise<AuthResponseDto> {
    return this.authService.loginWithFirebaseToken(firebaseTokenDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyToken(@Body() body: { token: string }) {
    const decodedToken = await this.authService.verifyToken(body.token);
    return {
      valid: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
      },
    };
  }
}
