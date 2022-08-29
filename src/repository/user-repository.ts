import { UserDocument } from '../documents/user';
import User from '../model/user';

export class UserRepository {
  public create(user: UserDocument): Promise<UserDocument> {
    return new User(user).save();
  }

  public findByEmail = (email: string) => User.findOne({ email }).exec();

  public findById = (id: string) => User.findOne({ _id: id }).exec();
}
