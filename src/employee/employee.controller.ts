import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ParseMonogIdPipe } from '../common/pipes/parse-monog-id.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.employeeService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.employeeService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMonogIdPipe) id: string) {
    return this.employeeService.remove(id);
  }
}
