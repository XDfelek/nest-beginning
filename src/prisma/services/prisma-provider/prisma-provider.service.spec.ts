import { Test, TestingModule } from '@nestjs/testing';
import { PrismaProviderService } from './prisma-provider.service';

describe('PrismaProviderService', () => {
  let service: PrismaProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaProviderService],
    }).compile();

    service = module.get<PrismaProviderService>(PrismaProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
