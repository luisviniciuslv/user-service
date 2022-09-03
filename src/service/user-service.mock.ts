import { UserDocument } from '../documents/user';

export const USER_PASSWORD_MOCK = 'oeSK2-kl2023mfd';
export const USER_EMAIL_MOCK = 'return-mock@awari.com';
export const USER_MOCK = {
  email: 'anything@awari.com',
  name: 'Awari Class',
  password: USER_PASSWORD_MOCK
} as UserDocument;

export const createUserMock = jest.fn(() => Promise.resolve(USER_MOCK));
