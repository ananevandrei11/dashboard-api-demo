import express, { type Express } from "express";
import { Server } from "http";
import type { UsersController } from "./users/users.controller.ts";
import type { ExeptionFilter } from "./error/exeption.filter.ts";
import type { ILoggerService } from "./logger/logger.interface.ts";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILoggerService;
  userController: UsersController;
  exeptionFilter: ExeptionFilter;

  constructor({
    logger,
    exeptionFilter,
    userController,
  }: {
    logger: ILoggerService;
    userController: UsersController;
    exeptionFilter: ExeptionFilter;
  }) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.exeptionFilter = exeptionFilter;
    this.userController = userController;
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
