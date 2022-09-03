import { encryptStr } from './encrypt';

const ENCRYPTED_TEXT_MOCK = 'anything_DK';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve(ENCRYPTED_TEXT_MOCK))
}));

describe('Encrypt functions tests', () => {
  test('should generate a new encrypted string successfuly', async () => {
    // arrange
    const text = 'abcd';

    // act
    const result = await encryptStr(text);

    // assert
    expect(result).toBe(ENCRYPTED_TEXT_MOCK);
  });
});
