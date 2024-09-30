import { app } from "./app";
import { config } from "dotenv";
import { AppDataSource } from "./data-source";
import { Logger } from "./shared/libs/logger.lib";

config();

async function bootstrap() {
  await AppDataSource.initialize();
  Logger.info("Database connected");

  app.listen(process.env.PORT, () => {
    Logger.info(`Server is running on port ${process.env.PORT}`);
  });
}

bootstrap();
