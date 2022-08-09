import * as EmailValidator from 'email-validator';
import { User } from '../../interfaces/user';
import { InvalidPayloadException } from './../../exceptions/invalid-payload-exception';

export interface ErrorResponse {
  status: number;
  message: string;
}
export const REQUIRED_FIELDS = [
  'name',
  'email',
  'password',
  'password_confirmation'
];

export const validateUserPayload = (user: User) => {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!user[REQUIRED_FIELDS[i]]?.trim()) {
      throw new InvalidPayloadException(
        `Invalid payload: field ${REQUIRED_FIELDS[i]} should be informed!`
      );
    }
  }

  const error: ErrorResponse | null = null;

  if (error) {
    return error;
  }
  if (!EmailValidator.validate(user.email)) {
    throw new InvalidPayloadException(`Invalid payload: invalid e-mail!`);
  }

  if (user.password != user.password_confirmation) {
    throw new InvalidPayloadException(
      `Invalid payload: password and password_confirmation should be equals`
    );
  }
};
