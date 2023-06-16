import { Module } from '@nestjs/common';
import { MailerServiceController } from './mailer-service.controller';
import { MailerService } from './mailer-service.service';

@Module({
  providers: [MailerService],
  controllers: [MailerServiceController],
})
export class MailerServiceModule {}
