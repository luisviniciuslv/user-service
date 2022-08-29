import { model, Schema } from 'mongoose';
import { UserDocument } from '../documents/user';

export const UserSchema = new Schema({
  name: { type: String, required: [true, 'Field is required'] },
  email: { type: String, required: [true, 'Field is required'] },
  password: { type: String, required: [true, 'Field is required'] }
});

const User = model<UserDocument>('user', UserSchema);

export default User;
