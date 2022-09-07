import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { Employee } from '../employee/entities/employee.entity';
import { PaginationDto, QueryFindAllDto } from '../common/dto/pagination.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import moment = require('moment');

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

    service.gain = (service.price * service.percentage) / 100;
    service.payment = service.price - service.gain;
    service.employee = employee._id;
    await service.save();
    try {
      if (employee.services)
        employee.services = [...employee.services, service._id];
      else employee.services = [service._id];

      await employee.save();
      return { ...createServiceDto, _id: service._id, employee };
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(queryFindAllDto: QueryFindAllDto) {
    const { limit = 500, page = 1, dateTime = '' } = queryFindAllDto;

    const services = await this.serviceModel
      .find({
        ...(dateTime !== '' && {
          createdAt: {
            $gte: moment(dateTime).startOf('day').toDate(),
            $lte: moment(dateTime).endOf('day').toDate(),
          },
        }),
      })
      .populate({
        path: 'employee',
        select: ['name', 'status'],
      })
      .limit(limit)
      .skip((page - 1) * limit);

    return {
      total: await this.serviceModel.countDocuments({
        ...(dateTime !== '' && {
          createdAt: {
            $gte: moment(dateTime).startOf('day').toDate(),
            $lte: moment(dateTime).endOf('day').toDate(),
          },
        }),
      }),
      limit: limit,
      page: page,
      data: services,
    };
  }

  async findOne(term: string) {
    let service: Service;

    if (!service && isValidObjectId(term))
      service = await this.serviceModel.findById(term);

    if (!service)
      service = await this.serviceModel.findOne({
        name: term,
      });

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
      // service.employee = employee._id;
    }

    try {
      await service.updateOne(updateServiceDto);
      return { ...service.toJSON(), ...updateServiceDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const service = await this.serviceModel.findById(id);
    if (!service) throw new NotFoundException(`Service not found`);

    const employee = await this.employeeModel.findById(service.employee);

    employee.services = employee.services.filter((serviceId: Types.ObjectId) =>
      serviceId.equals(service._id),
    );
    await employee.save();
    const { deletedCount } = await this.serviceModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) throw new NotFoundException(`Service not found`);
    return;
  }

  async removeAll() {
    const services = await this.serviceModel.find();
    for await (const service of services) {
      const employe = await this.employeeModel.findById(service.employee);
      if (employe) {
        employe.services = employe.services.filter(
          (serviceId: Types.ObjectId) => serviceId.equals(service._id),
        );
        await employe.save();
      }
    }
    const { deletedCount } = await this.serviceModel.deleteMany({});
    if (deletedCount === 0) throw new NotFoundException(`Services not found`);
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
