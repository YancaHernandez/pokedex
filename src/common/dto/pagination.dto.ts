import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

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
