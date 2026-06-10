import type { Request, Response, NextFunction } from 'express';
import type { BaseController } from '../common/base.controller.ts';

export interface IUsersController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}
