import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_SECRET,
      },
    });
  }

  async sendMail(options: nodemailer.SendMailOptions): Promise<void> {
    await this.transporter.sendMail(options);
  }

  async sendEmailVerification(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user?.emailVerified) {
      new ConflictException(`User ${userId} already verified`);
    }

    const email = user.email;

    const token =
      user.emailToken || Math.random().toString(36).substring(2, 15);

    const domain = process.env.DOMAIN || 'localhost:3000';
    const options = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify your email',
      html: `<h1>Verify your email</h1>
        <p>Hi ${user.username}, thanks for signing up to Stickies!</p>
        <p>Your token is ${token}, but you can also click <a href="${domain}/verifyEmail?token=${token}">here</a> to verify your email directly</p>`,
    };

    await this.sendMail(options);
  }
}
