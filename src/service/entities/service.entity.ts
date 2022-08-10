import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
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
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee.name,
    required: true,
  })
  employee: Types.ObjectId;

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
