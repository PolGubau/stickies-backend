import {
  Controller,
  Post,
  Body,
  Get,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordDto);
  }

  @Get('verifyEmail')
  @ApiOperation({ summary: 'Verify email by token' })
  async verifyEmail(@Query('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }
}
