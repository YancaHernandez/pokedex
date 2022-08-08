import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { Employee } from '../employee/entities/employee.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>, // private readonly serviceEmployee: EmployeeService,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = new this.serviceModel(createServiceDto);
    const employee = await this.employeeModel.findById(
      createServiceDto.employeeId,
    );

    if (!employee) throw new BadRequestException(`Employee not found`);

    service.employee = employee;
    service.gain = (service.price * service.percentage) / 100;
    service.payment = service.price - service.gain;
    try {
      return await service.save();
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 0 } = paginationDto;
    return this.serviceModel
      .find()
      .limit(limit)
      .skip(page * limit);
  }

  async findOne(term: string) {
    let service: Service;

    if (!service && isValidObjectId(term)) {
      service = await this.serviceModel.findById(term);
    }

    if (!service) {
      service = await this.serviceModel.findOne({
        name: term,
      });
    }

    if (!service) throw new NotFoundException(`Service not found`);

    return service;
  }

  async update(term: string, updateServiceDto: UpdateServiceDto) {
    let service = await this.findOne(term);
    if (updateServiceDto.employeeId) {
      const employee = await this.employeeModel.findById(
        updateServiceDto.employeeId,
      );
      if (!employee) throw new BadRequestException(`Employee not found`);
      service.employee = employee;
    }

    try {
      await service.updateOne(updateServiceDto);
      return { ...service.toJSON(), ...updateServiceDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.serviceModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Service with id ${id} not found`);
    return;
  }

  handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Service exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Error updating service`);
  }
}