import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './common/config/env.config';
import { JoiValidationShape } from './common/config/joi.validation';
import { EmployeeModule } from './employee/employee.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: JoiValidationShape,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    // UsersModule,
    EmployeeModule,
    CommonModule,
    SeedModule,
    ServiceModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
