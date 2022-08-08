import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
class User extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  username: string;

  @Prop()
  password: string;

  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;
}

const UserShema = SchemaFactory.createForClass(User);
//   .pre(
//   'save',
//   (next) => {
//     if (this.isModified('password')) {
//       this.password =  bcrypt.hash(this.password);
//     }
//     next();
//   },
// );

export { User, UserShema };
