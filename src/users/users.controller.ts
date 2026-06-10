import type { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller.ts";
import type { ILoggerService } from "../logger/logger.interface.ts";
import { HTTPError } from "../error/http-error.class.ts";

export class UsersController extends BaseController {
  constructor(logger: ILoggerService) {
    super(logger);
    this.bindRoutes([
      {
        path: "/login",
        method: "post",
        func: this.login,
      },
      {
        path: "/register",
        method: "post",
        func: this.register,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "Not Authorized", "Login Route"));
    // this.ok(res, "login");
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
