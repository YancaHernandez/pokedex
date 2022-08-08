import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { EmployeeModule } from '../employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceShema } from './entities/service.entity';
import { EmployeeService } from '../employee/employee.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Service.name,
        schema: ServiceShema,
      },
    ]),
    EmployeeModule,
  ],
  exports: [MongooseModule],
})
export class ServiceModule {}
