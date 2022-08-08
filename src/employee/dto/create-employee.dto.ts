import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MinLength(1)
  name: string;
}
