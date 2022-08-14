import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty({
    description: 'Email of the user',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Password of the user',
  })
  password: string;
}
