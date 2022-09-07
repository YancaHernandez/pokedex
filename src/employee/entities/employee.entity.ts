import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Service } from '../../service/entities/service.entity';

@Schema()
export class Employee extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    default: 'active',
    enum: ['active', 'inactive'],
  })
  status: string;

  @Prop({
    required: false,
    type: [SchemaTypes.ObjectId],
    ref: 'Service',
  })
  services: Types.ObjectId[];
}

export const EmployeeShema = SchemaFactory.createForClass(Employee);
