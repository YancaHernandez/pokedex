import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Employee } from '../../employee/entities/employee.entity';

@Schema()
export class Service extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  percentage: number;

  @Prop({
    required: true,
    ref: 'employee',
  })
  employee: Employee;

  @Prop({
    required: true,
  })
  gain: number;

  @Prop({
    required: true,
  })
  payment: number;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;
}

export const ServiceShema = SchemaFactory.createForClass(Service);
