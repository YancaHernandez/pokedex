import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
  })
  @IsNotEmpty({
    message: 'El nombre de usuario es obligatorio',
  })
  username: string;

  @ApiProperty({
    example: 'admin123',
  })
  @IsNotEmpty({
    message: 'La contraseña es obligatoria',
  })
  password: string;
}

export class TokenDto {
  @ApiProperty({
    type: String,
  })
  token: string;

  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;
}
