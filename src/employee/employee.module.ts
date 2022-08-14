import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EmployeeService } from './employee.service';
import { EmployeeShema, Employee } from './entities/employee.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeShema,
      },
    ]),
    AuthModule,
  ],
  exports: [EmployeeService, MongooseModule],
})
export class EmployeeModule {}
