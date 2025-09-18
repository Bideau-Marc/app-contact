import { Test, TestingModule } from '@nestjs/testing';
import { RemoveSensitiveDataInterceptorService } from './remove-sensitive-data-interceptor.service';

describe('RemoveSensitiveDataInterceptorService', () => {
  let service: RemoveSensitiveDataInterceptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveSensitiveDataInterceptorService],
    }).compile();

    service = module.get<RemoveSensitiveDataInterceptorService>(RemoveSensitiveDataInterceptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
