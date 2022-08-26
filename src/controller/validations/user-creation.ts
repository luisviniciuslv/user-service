import * as EmailValidator from 'email-validator';
import { InvalidPayloadException } from '../../exceptions/invalid-payload-exception';
import { UserRequestDTO } from '../dto/user-request-dto';

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

export const validateUserPayload = (user: UserRequestDTO) => {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!user[REQUIRED_FIELDS[i]]?.trim()) {
      throw new InvalidPayloadException(
        `Invalid payload: field ${REQUIRED_FIELDS[i]} should be informed!`
      );
    }
  }

  if (!EmailValidator.validate(user.email)) {
    throw new InvalidPayloadException('Invalid payload: invalid e-mail!');
  }

  if (user.password !== user.password_confirmation) {
    throw new InvalidPayloadException(
      'Invalid payload: password and password_confirmation should be equals!'
    );
  }
};
