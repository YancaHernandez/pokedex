import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from '../common/common.module';
import { UsersModule } from '../users/users.module';
import { EmployeeModule } from '../employee/employee.module';
import { ServiceModule } from '../service/service.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UsersModule, EmployeeModule, ServiceModule, CommonModule],
})
export class SeedModule {}
