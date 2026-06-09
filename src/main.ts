import { App } from "./app.ts";
import { LoggerService } from "./logger/logger.service.ts";
import { UsersController } from "./users/users.controller.ts";


async function bootstrap() {
  const logger = new LoggerService();
  const userController = new UsersController(logger);
  const app = new App(logger, userController);
  await app.init();
}

bootstrap();