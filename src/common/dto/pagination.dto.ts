import { ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Limit number',
    example: 10,
    required: false,
  })
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
  })
  page?: number;
}
export class QueryFindAllDto extends PaginationDto {
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  @ApiProperty({
    description: 'Status of the service',
    enum: ['active', 'inactive'],
    required: false,
  })
  status?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Day of the service',
    example: '2022-08-09',
    required: false,
  })
  dateTime: string;
}

export interface PaginationResultDto extends PaginationDto {
  total: number;
}

export interface PaginationResultWithDataDto<T> extends PaginationResultDto {
  data: T[];
}
