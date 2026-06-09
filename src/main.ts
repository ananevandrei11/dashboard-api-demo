import { App } from "./app.ts";
import { ExeptionFilter } from "./error/exeption.filter.ts";
import { LoggerService } from "./logger/logger.service.ts";
import { UsersController } from "./users/users.controller.ts";

async function bootstrap() {
  const logger = new LoggerService();
  const exeptionFilter = new ExeptionFilter(logger);
  const userController = new UsersController(logger);
  const app = new App({ logger, exeptionFilter, userController });
  await app.init();
}

bootstrap();
