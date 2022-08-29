import { UserDocument } from '../documents/user';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';
import { UserRepository } from '../repository/user-repository';

export class UserService {
  private userRepository = new UserRepository();

  public async createUser(user: UserDocument): Promise<UserDocument> {
    const foundUser = await this.findByEmail(user.email);
    if (foundUser) {
      throw new UserEmailAlreadyExistsException(
        'Invalid e-mail: already exists!'
      );
    }

    return this.userRepository.create(user);
  }

  public findByEmail = (email: string) =>
    this.userRepository.findByEmail(email);

  public findById = async (id: string) => {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(`User not found: ${id}`);
    }
    return user;
  };
}
