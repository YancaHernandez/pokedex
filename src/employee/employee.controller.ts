import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ParseMonogIdPipe } from '../common/pipes/parse-monog-id.pipe';
import { QueryFindAllDto } from '../common/dto/pagination.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiQuery({
    name: 'status',
    description: 'Status of the employee',
    enum: ['active', 'inactive'],
    required: false,
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(@Query() queryFindAllDto: QueryFindAllDto) {
    return this.employeeService.findAll(queryFindAllDto);
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

  @Patch('/:id/statusChange')
  statusChange(@Param('id', ParseMonogIdPipe) id: string) {
    return this.employeeService.statusChange(id);
  }
}
