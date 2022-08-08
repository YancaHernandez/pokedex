import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/users.entity';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}

export class UserDto extends CreateUserDto {
  constructor(entity: User) {
    super();
    this.username = entity.username;
    this.password = entity.password;
    this.email = entity.email;
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
