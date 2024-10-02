import { app } from "./app";
import { AppDataSource } from "./data-source";
import { Logger } from "./shared/libs/logger.lib";
import { config } from "dotenv";

async function bootstrap() {
  config();
  await AppDataSource.initialize();
  Logger.info("Database connected");

  app.listen(process.env.PORT, () => {
    Logger.info(`Server is running on port ${process.env.PORT}`);
  });
}

bootstrap();
