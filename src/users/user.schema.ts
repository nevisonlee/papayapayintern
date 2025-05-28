import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;  // field for email

  @Prop({ required: true })
  password!: string;

  @Prop({ default: false })  // field for email verification status
  verified!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
