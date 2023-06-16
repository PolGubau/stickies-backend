import { Test, TestingModule } from '@nestjs/testing';
import { StickiesController } from './stickies.controller';
import { StickyService } from './stickies.service';

describe('StickiesController', () => {
  let controller: StickiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StickiesController],
      providers: [StickyService],
    }).compile();

    controller = module.get<StickiesController>(StickiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
