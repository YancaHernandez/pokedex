import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { QueryFindAllDto } from '../common/dto/pagination.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = await this.employeeModel.create(createEmployeeDto);
      return employee;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(queryFindAllDto: QueryFindAllDto) {
    const { limit = 100, page = 1, status = 'active' } = queryFindAllDto;

    return this.employeeModel
      .find({
        isActive: status,
      })
      .populate({
        path: 'services',
        select: [
          'name',
          'price',
          'percentage',
          'gain',
          'payment',
          'createdAt',
          'updatedAt',
        ],
      })
      .limit(limit)
      .skip((page - 1) * limit);
  }

  async findOne(term: string) {
    let employee: Employee;

    if (!employee && isValidObjectId(term)) {
      employee = await this.employeeModel.findById(term);
    }

    if (!employee) {
      employee = await this.employeeModel.findOne({
        name: term,
      });
    }

    if (!employee) throw new BadRequestException(`Employee not found`);

    return employee;
  }

  async update(term: string, updateEmployeeDtoDto: UpdateEmployeeDto) {
    let employee = await this.findOne(term);
    if (updateEmployeeDtoDto.name)
      updateEmployeeDtoDto.name = updateEmployeeDtoDto.name.toLowerCase();

    try {
      await employee.updateOne(updateEmployeeDtoDto);
      return { ...employee.toJSON(), ...updateEmployeeDtoDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async statusChange(id: string) {
    let employee = await this.findOne(id);
    employee.status = 'inactive';
    try {
      await employee.save();
      return employee;
    } catch (error) {
      this.handleException(error);
    }
  }

  handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Employee exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(`Error updating employee`);
  }
}
