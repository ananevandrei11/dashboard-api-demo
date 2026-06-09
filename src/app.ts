import express, { type Express } from "express";
import { Server } from "http";
import { userRouter } from "./users/index.ts";
import type { LoggerService } from "./logger/logger.service.ts";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  useRoutes() {
    this.app.use("/users", userRouter);
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
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Example app listening on host: http://localhost:${this.port}`);
    });
  }
}
