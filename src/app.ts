import express, { type Express } from "express";
import { Server } from "http";
import { userRouter } from "./users/index.ts";

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
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
      console.log(`Example app listening on host: http://localhost:${this.port}`);
    });
  }
}
