import { validateSearchParams } from './user-search';

const VALID_USER_MOCK = '102030';

class NoErrorException extends Error {}

const errorWrapper = (callback: () => void): Error => {
  try {
    callback();
    throw new NoErrorException();
  } catch (error) {
    return error;
  }
};

jest.mock('mongoose', () => ({
  isValidObjectId: jest.fn((id: string) => id === VALID_USER_MOCK)
}));

describe('Searching user validation tests', () => {
  test('should throw InvalidSearchParamsExeption when search user params is valid', () => {
    // arange
    const params = { id: VALID_USER_MOCK };

    // act
    const error = errorWrapper(() => validateSearchParams(params));

    // assert
    expect(error).toBeInstanceOf(NoErrorException);
  });
});
