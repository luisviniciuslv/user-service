import { Request, Response, Router } from 'express';
import { InvalidPayloadException } from '../exceptions/invalid-payload-exception';
import { InvalidSearchParamsExeption } from '../exceptions/invalid-search-params';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { UserNotFoundException } from '../exceptions/user-not-found-exception';
import { UserService } from '../service/user-service';
import { toDocument, UserRequestDTO } from './dto/user-request-dto';
import { validateUserPayload } from './validations/user-creation';
import { validateSearchParams } from './validations/user-search';

export class UserController {
  private _router = Router();
  private userService = new UserService();

  public get router() {
    return this._router;
  }

  constructor() {
    this._router.post('/', this.create);
    this._router.get('/:id', this.getUser);
  }

  private getUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      validateSearchParams({ id });

      const user = await this.userService.findById(id);

      res.status(200).send(user);
    } catch (error) {
      console.error(`find user by id error, id: ${id}`, error);

      if (error instanceof UserNotFoundException) {
        res.status(404).send(error.message);
        return;
      }

      if (error instanceof InvalidSearchParamsExeption) {
        res.status(400).send(error.message);
        return;
      }
      res.status(500).send('Internal server error');
    }
  };

  private create = async (req: Request, res: Response) => {
    const user: UserRequestDTO = {
      ...req.body,
      email: req.body.email?.toLowerCase()
    };

    try {
      validateUserPayload(user);

      const persistedUser = await this.userService.createUser(toDocument(user));

      res
        .location(`api/users/${persistedUser._id?.toString()}`)
        .sendStatus(201);
    } catch (error) {
      console.error(`user.name: ${user.name}, e-mail: ${user.email}`, error);

      if (error instanceof UserEmailAlreadyExistsException) {
        res.status(422).send(error.message);
        return;
      }

      if (error instanceof InvalidPayloadException) {
        res.status(400).send(error.message);
        return;
      }

      res.status(500).send('Internal Server Error');
    }
  };
}
