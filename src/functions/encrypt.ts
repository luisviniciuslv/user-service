import bcrypt from 'bcrypt';

export const encryptStr = (text: string): Promise<string> =>
  bcrypt.hash(text, 5);
