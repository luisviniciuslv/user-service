export class UserEmailAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserEmailException';
  }
}
