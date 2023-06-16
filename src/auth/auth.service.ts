import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { SignupDto } from './dto/singup.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const { usernameOrEmail, password } = loginDto;

    // Check if the username or email exists in the database
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Validate the password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    // Password is valid, return the user
    return user;
  }

  async isTheTokenValid(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
    const { username, email, password } = signupDto;

    // Check if email is already registered
    const emailExists = await this.prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Check if username is already taken
    const usernameExists = await this.prisma.user.findUnique({
      where: { username },
    });
    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user in the database
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email, token, newPassword } = resetPasswordDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isTokenValid = await this.isTheTokenValid(token);
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid token');
    }

    // Update the user's password
    user.password = newPassword;
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: user.password },
    });
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { emailToken: token },
    });

    if (!user) {
      throw new NotFoundException('Invalid email verification token');
    }

    // Update the user's email verification status in the database
    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });
  }
}
