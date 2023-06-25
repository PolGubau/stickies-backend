import { Test, TestingModule } from '@nestjs/testing';
import { TagStickyController } from './tag-sticky.controller';
import { TagStickyService } from './tag-sticky.service';

describe('TagStickyController', () => {
  let controller: TagStickyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagStickyController],
      providers: [TagStickyService],
    }).compile();

    controller = module.get<TagStickyController>(TagStickyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
