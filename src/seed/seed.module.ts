import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from '../common/common.module';
import { EmployeeModule } from '../employee/employee.module';
import { ServiceModule } from '../service/service.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, EmployeeModule, ServiceModule, CommonModule],
})
export class SeedModule {}
