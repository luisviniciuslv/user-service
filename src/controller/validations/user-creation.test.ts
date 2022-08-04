import { InvalidPayloadException } from '../../exceptions/invalid-payload-exception';
import { User } from '../../interfaces/user';
import { REQUIRED_FIELDS, validateUserPayload } from './user-creation';

class NoErrorException extends Error {}

const errorwrapper = (callback: () => void): Error => {
  try {
    callback();
    throw new NoErrorException();
  } catch (error) {
    return error;
  }
};

describe('User creation tests', () => {
  test('should throw InvalidPayloadException when field is required', () => {
    // arrange
    REQUIRED_FIELDS.forEach((field) => {
      const INCORRECT_VALUES = [null, undefined, '', ' '];
      INCORRECT_VALUES.forEach((value) => {
        const user = {
          email: 'abc@awari.com',
          name: 'Awari Class',
          password: '123',
          password_confirmation: '123',
          [field]: value
        };

        // act
        const error = errorwrapper(() => validateUserPayload(user as User));

        // assert
        expect(error).toBeInstanceOf(InvalidPayloadException);
        expect(error.message).toBe(
          `Invalid payload: field ${field} should be informed!`
        );
      });
    });
  });

  test('should throw InvalidPayloadException when email is invalid', () => {
    // arrange
    const invalidEmails = ['abc', '@abc.com'];
    invalidEmails.forEach((value) => {
      const user: User = {
        email: value,
        name: 'Awari Class',
        password: '123',
        password_confirmation: '123'
      };

      // act
      const error = errorwrapper(() => validateUserPayload(user));

      //assert
      expect(error).toBeInstanceOf(InvalidPayloadException);
      expect(error.message).toBe(`Invalid payload: invalid e-mail!`);
    });
  });

  test(
    'should throw InvalidPayloadExceptinr when there is' +
      'different password and password confirmation',
    () => {
      // arrange
      const user: User = {
        email: 'awari@awari.com',
        name: 'Awari Class',
        password: '123',
        password_confirmation: '123 '
      };

      // act
      const error = errorwrapper(() => validateUserPayload(user));

      // assert
      expect(error).toBeInstanceOf(InvalidPayloadException);
      expect(error.message).toBe(
        'Invalid payload: password and password_confirmation should be equals'
      );
    }
  );

  test('should throw NoErrorException when user payload is valid', () => {
    // arrange
    const user: User = {
      email: 'awari@awari.com',
      name: 'Awari Class',
      password: '123',
      password_confirmation: '123'
    };

    // act
    const error = errorwrapper(() => validateUserPayload(user));

    // assert
    expect(error).toBeInstanceOf(NoErrorException);
  });
});
