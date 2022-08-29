import { UserDocument } from '../documents/user';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';
import { UserService } from './user-service';

const USER_MOCK: UserDocument = {
  email: 'return-mock@awari.com',
  name: 'Awari Class',
  password: '123'
} as UserDocument;

const createUserMock = jest.fn(() => USER_MOCK);

jest.mock('./../repository/user-repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    findByEmail: (email: string) =>
      email === 'return-mock@awari.com' ? USER_MOCK : undefined,
    findById: (id: string) => (id === '777' ? USER_MOCK : undefined),
    create: createUserMock
  }))
}));

describe('User service tests', () => {
  test('should throw UserEmailAlreadyExistsException when user e-mail already exists', (done) => {
    new UserService()
      .createUser(USER_MOCK)
      .then(() => fail())
      .catch((error) => {
        expect(error).toBeInstanceOf(UserEmailAlreadyExistsException);
        expect(error.message).toBe('Invalid e-mail: already exists!');
        done();
      });
  });

  test('should return user document when user is created sucessfully', async () => {
    // arrange
    const user = {
      ...USER_MOCK,
      email: 'awari@awari.com'
    } as UserDocument;
    const userService = new UserService();

    // act
    const userDocument = await userService.createUser(user);

    // assert
    expect(createUserMock).toBeCalledWith(user);
    expect(userDocument).toStrictEqual(USER_MOCK);
  });

  test('should return user when search user by e-mail', async () => {
    // arrange

    const userService = new UserService();

    // act
    const user = await userService.findByEmail(USER_MOCK.email);

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
    } catch (error) {
      // assert
      expect(error).toBeInstanceOf(UserNotFoundException);
      expect(error.message).toBe(`User not found: ${userId}`);
    }
  });
  test('should return a valid user when find user by id ', async () => {
    // arrange
    const userService = new UserService();

    // act
    const user = await userService.findById('777');

    // assert
    expect(user).toStrictEqual(USER_MOCK);
  });
});
