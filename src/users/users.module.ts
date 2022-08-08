import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserShema } from './entities/users.entity';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserShema,
      },
    ]),
    ConfigModule,
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [MongooseModule],
})
export class UsersModule {}
