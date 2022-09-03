import { UserDocument } from '../documents/user';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';
import { UserService } from './user-service';
import {
  createUserMock,
  USER_EMAIL_MOCK,
  USER_MOCK,
  USER_PASSWORD_MOCK
} from './user-service.mock';

jest.mock('../repository/user-repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    findByEmail: (email: string) =>
      Promise.resolve(
        email === 'return-mock@awari.com' ? USER_MOCK : undefined
      ),
    findById: (id: string) =>
      Promise.resolve(id === '777' ? USER_MOCK : undefined),
    create: createUserMock
  }))
}));

jest.mock('../functions/encrypt', () => ({
  encryptStr: jest.fn(() => Promise.resolve(USER_PASSWORD_MOCK))
}));

describe('User service tests', () => {
  test('should throw UserEmailAlreadyExistsException when user e-mail already exists', async () => {
    // arrange
    const userService = new UserService();

    try {
      // act
      await userService.createUser({
        ...USER_MOCK,
        email: USER_EMAIL_MOCK
      } as UserDocument);

      fail();
    } catch (error) {
      // assert
      expect(error).toBeInstanceOf(UserEmailAlreadyExistsException);
      expect(error.message).toBe('Invalid e-mail: already exists!');
    }
  });

  test('should return user document when user is created successfully', async () => {
    // arrange
    const userService = new UserService();
    const expectedUser = {
      ...USER_MOCK,
      password: USER_PASSWORD_MOCK
    };

    // act
    const createdUser = await userService.createUser(USER_MOCK);

    // assert
    expect(expectedUser).toStrictEqual(createdUser);
    expect(createUserMock).toBeCalledWith(expectedUser);
  });

  test('should return user when search user by e-mail', async () => {
    // arrange
    const userService = new UserService();

    // act
    const user = await userService.findByEmail(USER_EMAIL_MOCK);

    // assert
    expect(user).toStrictEqual(USER_MOCK);
  });

  test('should throw UserNotFoundException when user is not found by id', async () => {
    // arrange
    const userService = new UserService();
    const userId = '102030';

    try {
      // act
      await userService.findById(userId);
      fail();
    } catch (error) {
      // assert
      expect(error).toBeInstanceOf(UserNotFoundException);
      expect(error.message).toBe(`user not found: ${userId}`);
    }
  });

  test('should return a valid user when find user by id', async () => {
    // arrange
    const userService = new UserService();

    // act
    const user = await userService.findById('777');

    // assert
    expect(user).toStrictEqual(USER_MOCK);
  });
});
