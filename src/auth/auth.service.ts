import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly authModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.authModel.create({
        ...createUserDto,
        password: this.hashPassword(password),
      });
      return {
        user: user,
        token: this.getJwtToken({ id: user._id }),
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.authModel
      .findOne({
        email,
      })
      .select('_id fullName email password ');

    if (!user) throw new BadRequestException('Las credenciales son invalidas');

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Las credenciales son invalidas');

    user.password = undefined;
    return {
      user: user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(`Error updating User`);
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  }
}
