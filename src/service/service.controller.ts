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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto, QueryFindAllDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('service')
@ApiTags('Service')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiBody({
    type: CreateServiceDto,
  })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    example: 1,
  })
  findAll(@Query() queryFindAllDto: QueryFindAllDto) {
    return this.serviceService.findAll(queryFindAllDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }

  @Post('deleteAll')
  removeAll() {
    return this.serviceService.removeAll();
  }
}
