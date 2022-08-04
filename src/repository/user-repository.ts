import { User } from '../interfaces/user';

export class UserRepository {
  private users: User[] = [];

  public create(user: User): number {
    this.users = [...this.users, user];

    return this.users.length;
  }

  public findByEmail = (email: string) =>
    this.users.find((u) => u.email === email);
}
