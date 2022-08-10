import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
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
  status?: string;
}
