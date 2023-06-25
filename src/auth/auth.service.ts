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
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

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
        emailToken: Math.random().toString(36).substring(2, 15),
        emailVerified: false,
      },
    });

    const gettedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    // Send the verification email
    await this.mailService.sendEmailVerification(gettedUser.id);

    // Generate JWT token
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async resetPassword(resetPassword: ResetPasswordDto): Promise<void> {
    const { userId, newPassword } = resetPassword;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (newPassword === user.password) {
      throw new ConflictException('New password is the same as the old one');
    }

    if (!user.emailVerified) {
      throw new ConflictException('Email not verified, compulsory to reset');
    }

    if (newPassword.length < 8) {
      throw new ConflictException(
        'Password must be at least 8 characters long',
      );
    }

    if (newPassword.length > 50) {
      throw new ConflictException(
        'Password must be at most 50 characters long',
      );
    }

    if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
      throw new ConflictException(
        'Password must contain at least one uppercase letter, one lowercase letter and one number',
      );
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  async verifyEmail(userId: number, token: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.emailVerified) {
      throw new ConflictException('Email already verified');
    }

    if (!user.emailToken) {
      throw new ConflictException('You dont have a token, ask for a new one');
    }

    if (user.emailToken !== token) {
      throw new UnauthorizedException('Invalid token');
    }

    // Update the user's email verification status in the database
    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailToken: null },
    });
  }
}
