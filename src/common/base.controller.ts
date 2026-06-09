import { Router, type Response } from "express";
import type { LoggerService } from "../logger/logger.service.ts";
import type { IControllerRoute } from "./route.interface.ts";
export { Router } from "express";

export abstract class BaseController {
  private readonly _router: Router;
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this._router = Router();
    this.logger = logger;
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  public creates(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}
