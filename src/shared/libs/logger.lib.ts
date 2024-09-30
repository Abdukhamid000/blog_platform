import { createLogger, format, transports, addColors } from "winston";

const customColors = {
  info: "blue",
  error: "red",
  warn: "yellow",
  debug: "green",
};

addColors(customColors);

export const Logger = createLogger({
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: "HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${level}] ${timestamp} ${message}`;
    })
  ),
  transports: [new transports.Console()],
});
