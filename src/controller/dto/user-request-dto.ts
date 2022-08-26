import { UserDocument } from '../../documents/user';

export interface UserRequestDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const toDocument = (dto: UserRequestDTO): UserDocument => {
  const user = {
    name: dto.name,
    email: dto.email,
    password: dto.password
  } as UserDocument;

  return user;
};
