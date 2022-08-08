import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Service name',
    required: true,
    type: String,
  })
  name: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Price of service',
    required: true,
    type: Number,
  })
  price: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Percentage of service',
    required: true,
    type: Number,
  })
  percentage: number;

  @IsMongoId()
  @ApiProperty({
    description: 'Id of employee',
    required: true,
  })
  employeeId: string;
}
