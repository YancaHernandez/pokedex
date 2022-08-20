import { ApiParam, ApiProperty, ApiQuery } from '@nestjs/swagger';
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
  })
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Page number',
    example: 1,
  })
  page?: number;
}

export class PaginationResultDto extends PaginationDto {
  @IsNumber()
  total: number;
}

export class PaginationResultWithDataDto<T> extends PaginationResultDto {
  @IsNumber()
  data: T[];
}

export class QueryFindAllDto extends PaginationDto {
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  @ApiProperty({
    description: 'Status of the service',
    enum: ['active', 'inactive'],
  })
  status?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Day of the service',
    example: '2022-08-09',
  })
  dateTime: string;
}
