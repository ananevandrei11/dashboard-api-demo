import express, { type Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { UsersController } from "./users/users.controller.ts";
import { ExeptionFilter } from "./error/exeption.filter.ts";
import type { ILoggerService } from "./logger/logger.interface.ts";
import { TYPES } from "./types.ts";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILoggerService) private logger: ILoggerService,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    @inject(TYPES.UsersController) private userController: UsersController,
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilter() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  ping() {
    this.app.get("/ping", (_, res) => {
      res.set({ "Content-Type": "application/json" });
      res.send("Pong");
    });
  }

  public async init() {
    this.ping();
    this.useRoutes();
    this.useExeptionFilter();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(
        `Example app listening on host: http://localhost:${this.port}`,
      );
    });
  }
}
