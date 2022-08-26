import { Request, Response, Router } from 'express';
import { InvalidPayloadException } from '../exceptions/invalid-payload-exception';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { UserService } from '../service/user-service';
import { toDocument, UserRequestDTO } from './dto/user-request-dto';
import { validateUserPayload } from './validations/user-creation';

export class UserController {
  private _router = Router();
  private userService = new UserService();

  public get router() {
    return this._router;
  }

  constructor() {
    this._router.get('/', (_: Request, res: Response) => {
      res.send('Anything here!!');
    });

    this._router.post('/', this.create);
  }

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
