import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsString } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsString()
  @IsMongoId()
  _id: string;
}
