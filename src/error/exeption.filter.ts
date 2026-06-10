import type { Request, Response, NextFunction } from "express";
import type { ILoggerService } from "../logger/logger.interface.ts";
import type { IExeptionFilter } from "./exeption.filter.interface.ts";
import { HTTPError } from "./http-error.class.ts";


export class ExeptionFilter implements IExeptionFilter {
  logger: ILoggerService;

  constructor(logger: ILoggerService) {
    this.logger = logger;
  }
  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(`Context: ${err?.context}, Error: ${err.message}, StatusCode: ${err.statusCode}`);
      res.status(err.statusCode).send({ error: err.message, context: err?.context });
    } else {
      this.logger.error(`Error: ${err.message}`);
      res.status(500).send({ error: err.message });
    }
  }
}
