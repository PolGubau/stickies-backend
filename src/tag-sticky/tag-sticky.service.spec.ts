import { Test, TestingModule } from '@nestjs/testing';
import { TagStickyService } from './tag-sticky.service';

describe('TagStickyService', () => {
  let service: TagStickyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagStickyService],
    }).compile();

    service = module.get<TagStickyService>(TagStickyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
