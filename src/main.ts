import { Container, ContainerModule } from "inversify";
import { TYPES } from "./types.ts";
import { App } from "./app.ts";
import { ExeptionFilter } from "./error/exeption.filter.ts";
import { LoggerService } from "./logger/logger.service.ts";
import { UsersController } from "./users/users.controller.ts";
import type { ILoggerService } from "./logger/logger.interface.ts";
import type { IExeptionFilter } from "./error/exeption.filter.interface.ts";

/*
async function bootstrap() {
  const logger = new LoggerService();
  const exeptionFilter = new ExeptionFilter(logger);
  const userController = new UsersController(logger);
  const app = new App({ logger, exeptionFilter, userController });
  await app.init();
}

bootstrap();
*/

export const appBindings = new ContainerModule((load) => {
  load.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
  load.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  load.bind<UsersController>(TYPES.UsersController).to(UsersController);
  load.bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

/*
const appContainer = new Container();
appContainer.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();
*/

export const { app, appContainer } = bootstrap();
