import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
}

export const EmployeeShema = SchemaFactory.createForClass(Employee);
