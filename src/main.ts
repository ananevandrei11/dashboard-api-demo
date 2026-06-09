import { App } from "./app.ts";
import { LoggerService } from "./logger/logger.service.ts";


async function bootstrap() {
  const logger = new LoggerService();
  const app = new App(logger);
  await app.init();
}

bootstrap();