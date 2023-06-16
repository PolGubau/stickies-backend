import { Test, TestingModule } from '@nestjs/testing';
import { MailerServiceController } from './mailer-service.controller';

describe('MailerServiceController', () => {
  let controller: MailerServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerServiceController],
    }).compile();

    controller = module.get<MailerServiceController>(MailerServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
