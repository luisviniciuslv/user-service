import { Request, Response, Router } from 'express';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists-exception';
import { User } from '../interfaces/user';
import { UserService } from '../service/user-service';
import { InvalidPayloadException } from './../exceptions/invalid-payload-exception';
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

    this._router.post('/', (req: Request, res: Response) => {
      const user: User = {
        ...req.body,
        email: req.body.email?.toLowerCase()
      };
      try {
        validateUserPayload(user);

        const userId = this.userService.createUser(user);

        res.location(`api/users/${userId}`).sendStatus(201);
      } catch (error) {
        console.error(`user.name: ${user.name}, ${user.email}`, error);

        if (error instanceof UserEmailAlreadyExistsException) {
          res.status(400).send(error.message);
          return;
        }

        if (error instanceof InvalidPayloadException) {
          res.status(400).send(error.message);
          return;
        }
      }
      res.status(500).send('Internal server error');
    });
  }
}
