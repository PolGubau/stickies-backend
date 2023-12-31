import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/singup.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Signup' })
  async signup(
    @Body() signupDto: SignupDto,
  ): Promise<{ access_token: string }> {
    const result = await this.authService.signup(signupDto);
    return result;
  }

  @Patch('reset-password/:userId/:newPassword')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset password' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordDto);
  }

  @Patch('verifyEmail/:userId/:token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify email by userId' })
  async verifyEmail(
    @Param('userId') userId: number,
    @Param('token') token: string,
  ): Promise<void> {
    await this.authService.verifyEmail(+userId, token);
  }
}
