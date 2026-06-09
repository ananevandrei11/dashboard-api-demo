import { Logger, type ILogObj } from "tslog";

export class LoggerService {
  private logger;

  constructor() {
    this.logger = new Logger<ILogObj>({
      type: 'pretty',
      prettyLogTemplate: '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}}.{{ms}} {{logLevelName}} ',
    })
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}