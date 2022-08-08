import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@Controller('seed')
@ApiTags('Seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
