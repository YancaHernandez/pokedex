import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './Dto/user.dto';
import { User } from './entities/users.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 0 } = paginationDto;
    const users = await this.userModel
      .find()
      .limit(limit)
      .skip(page * limit);

    users.map((user) => {
      user.password = undefined;
    });
    return users;
  }

  handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Error updating user`);
  }
}
