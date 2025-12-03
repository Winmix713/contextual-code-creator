type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private isDev: boolean;

  constructor() {
    this.isDev = import.meta.env.DEV;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  private print(entry: LogEntry) {
    if (this.isDev) {
      const style = {
        debug: "color: gray;",
        info: "color: blue;",
        warn: "color: orange; font-weight: bold;",
        error: "color: red; font-weight: bold;",
      };

      console.groupCollapsed(`%c[${entry.level.toUpperCase()}] ${entry.message}`, style[entry.level]);
      if (entry.data) console.log(entry.data);
      console.log(`Time: ${entry.timestamp}`);
      console.groupEnd();
    } else {
      if (entry.level === "error") {
        console.error(entry.message, entry.data);
      }
    }
  }

  debug(message: string, data?: any, _context?: any, _source?: string) {
    this.print(this.formatMessage("debug", message, data));
  }

  info(message: string, data?: any, _context?: any, _source?: string) {
    this.print(this.formatMessage("info", message, data));
  }

  warn(message: string, data?: any, _context?: any, _source?: string) {
    this.print(this.formatMessage("warn", message, data));
  }

  error(message: string, error?: any, _context?: any, _source?: string) {
    this.print(this.formatMessage("error", message, error));
  }
}

export const logger = new Logger();
export default logger;
