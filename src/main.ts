import { App } from "./app.ts";


async function bootstrap() {
  const app = new App();
  await app.init();
}

bootstrap();