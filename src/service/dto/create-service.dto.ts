import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateServiceDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Service name',
    required: true,
    type: String,
    example: 'Service 1',
  })
  name: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Price of service',
    required: true,
    type: Number,
    example: 100,
  })
  price: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Percentage of service',
    required: true,
    type: Number,
    example: 10,
  })
  percentage: number;

  @IsMongoId()
  @ApiProperty({
    description: 'Id of employee',
    required: true,
    example: '5e8f8f8f8f8f8f8f8f8f8f8',
  })
  employeeId: Types.ObjectId;
}
