import { isValidObjectId } from 'mongoose';
import { InvalidSearchParamsExeption } from '../../exceptions/invalid-search-params';

interface validateSearchParams {
  id: string;
}

export const validateSearchParams = (paramns: validateSearchParams) => {
  if (!isValidObjectId(paramns.id)) {
    throw new InvalidSearchParamsExeption('ID inválido');
  }
};
