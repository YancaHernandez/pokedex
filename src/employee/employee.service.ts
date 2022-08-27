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
import {
  PaginationResultWithDataDto,
  QueryFindAllDto,
} from '../common/dto/pagination.dto';

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

  async findAll(
    queryFindAllDto: QueryFindAllDto,
  ): Promise<PaginationResultWithDataDto<Employee>> {
    const { limit = 100, page = 1, status = '' } = queryFindAllDto;

    const employees = await this.employeeModel
      .find({
        ...(status !== '' && { status }),
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

    return {
      total: await this.employeeModel.countDocuments({ isActive: status }),
      limit: limit,
      page: page,
      data: employees,
    };
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

  async findOneByName(name: string) {
    const employee = await this.employeeModel.findOne({
      name: name,
    });
    return !!employee;
  }

  async update(term: string, updateEmployeeDtoDto: UpdateEmployeeDto) {
    let employee = await this.findOne(term);

    try {
      await employee.updateOne(updateEmployeeDtoDto);
      return { ...employee.toJSON(), ...updateEmployeeDtoDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async statusChange(id: string) {
    let employee = await this.findOne(id);
    if (employee.status === 'active') employee.status = 'inactive';
    else employee.status = 'active';

    try {
      await employee.save();
      return employee;
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    let employee = await this.findOne(id);
    if (!employee) throw new BadRequestException(`Employee not found`);
    if (employee.services.length > 0)
      throw new BadRequestException(`Employee tiene servicios asociados`);
    try {
      await employee.remove();
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
