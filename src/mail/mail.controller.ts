import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@Controller('mail')
@ApiTags('Mail')
export class MailServiceController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendVerificationEmail/:userId')
  async sendVerificationEmail(@Param('userId') userId: number): Promise<void> {
    await this.mailService.sendEmailVerification(+userId);
  }
}
