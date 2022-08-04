import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { User } from '../interfaces/user';
import { UserRepository } from './../repository/user-repository';

export class UserService {
  private UserRepository = new UserRepository();

  public createUser(user: User): number {
    if (this.findByEmail(user.email)) {
      throw new UserEmailAlreadyExistsException(
        'Invalid email: already exists'
      );
    }
    return this.UserRepository.create(user);
  }
  public findByEmail = (email: string) =>
    this.UserRepository.findByEmail(email);
}
