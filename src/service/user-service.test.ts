import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { User } from '../interfaces/user';
import { UserService } from './user-service';
class NoErrorException extends Error {}

const errorwrapper = (callback: () => void): Error => {
  try {
    callback();
    throw new NoErrorException();
  } catch (error) {
    return error;
  }
};

const USER_ID_MOCK = 98981293;

const USER_MOCK: User = {
  email: 'return-mock@awari.com',
  name: 'Awari Class',
  password: '123',
  password_confirmation: '123'
};

const createUserMock = jest.fn(() => USER_ID_MOCK);

jest.mock('./../repository/user-repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    findByEmail: (email: string) =>
      email === 'return-mock@awari.com' ? USER_MOCK : undefined,
    create: createUserMock
  }))
}));

describe('User service tests', () => {
  test('should throw UserEmailAlreadyExistsException when user e-mail already exists', () => {
    // arrange
    const userService = new UserService();

    // act
    const error = errorwrapper(() => userService.createUser(USER_MOCK));

    // assert
    expect(error).toBeInstanceOf(UserEmailAlreadyExistsException);
    expect(error.message).toBe('Invalid email: already exists');
  });

  test('should return user id when user is created sucessfully', () => {
    // arrange
    const user: User = {
      ...USER_MOCK,
      email: 'awari@awari.com'
    };
    const userService = new UserService();

    // act
    const userId = userService.createUser(user);

    // assert
    expect(createUserMock).toBeCalledWith(user);
    expect(userId).toBe(USER_ID_MOCK);
  });

  test('should return user when search user by e-mail', () => {
    // arrange

    const userService = new UserService();

    // act
    const user = userService.findByEmail(USER_MOCK.email);

    // assert
    expect(user).toStrictEqual(USER_MOCK);
  });
});
