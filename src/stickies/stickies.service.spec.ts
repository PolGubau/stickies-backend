import { Test, TestingModule } from '@nestjs/testing';
import { StickiesService } from './stickies.service';

describe('StickiesService', () => {
  let service: StickiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickiesService],
    }).compile();

    service = module.get<StickiesService>(StickiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
