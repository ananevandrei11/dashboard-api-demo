import { Logger, type ILogObj } from 'tslog';
import type { ILoggerService } from './logger.interface.ts';
import { injectable } from 'inversify';

@injectable()
export class LoggerService implements ILoggerService {
  private logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger<ILogObj>({
      type: 'pretty',
      prettyLogTemplate: '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}}.{{ms}} {{logLevelName}} ',
    });
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
