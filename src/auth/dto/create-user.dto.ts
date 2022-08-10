import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user',
  })
  email: string;

  @IsString()
  @MinLength(6)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'The password is too weak',
  //   })
  @ApiProperty({
    description: 'Password of the user',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Full name of the user',
  })
  fullName: string;
}
