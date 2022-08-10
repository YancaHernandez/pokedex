import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Password of the user',
  })
  password: string;
}
