import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/entities/users.entity';
import { usersData } from './data/users.data';
import * as bcrypt from 'bcrypt';
import { Employee } from '../employee/entities/employee.entity';
import { employeesData } from './data/employes.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
  ) {}

  async executeSeed() {
    await this.executeSeedUsers();
    await this.executeSeedEmployees();
    return 'Seeded  executeds';
  }

  async executeSeedUsers() {
    await this.userModel.deleteMany({});
    const data = usersData;

    const usersToInsert = [];
    const salt = 8;
    for await (let { username, password, email } of data) {
      password = await bcrypt.hash(password, salt);
      usersToInsert.push({
        username,
        password,
        email,
      });
    }
    await this.userModel.insertMany(usersToInsert);
    return 'Seeded users executed';
  }

  async executeSeedEmployees() {
    await this.employeeModel.deleteMany({});
    const data = employeesData;

    const employeeesToInsert = [];
    const salt = 8;
    for await (let { name } of data) {
      employeeesToInsert.push({
        name,
      });
    }
    await this.employeeModel.insertMany(employeeesToInsert);
    return 'Seeded employees executed';
  }
}
