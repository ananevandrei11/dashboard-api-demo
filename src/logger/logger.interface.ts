import { Logger, type ILogObj } from "tslog";

export interface ILoggerService {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}
