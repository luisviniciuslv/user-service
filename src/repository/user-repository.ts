import { UserDocument } from '../documents/user';
import User from '../model/user';

export class UserRepository {
  public create(user: UserDocument): Promise<UserDocument> {
    const UserModel = User();
    return new UserModel(user).save();
  }

  public findByEmail = (email: string) => User().findOne({ email }).exec();
}
