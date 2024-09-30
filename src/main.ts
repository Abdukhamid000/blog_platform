import { app } from "./app";
import { config } from "dotenv";
import { AppDataSource } from "./data-source";

config();

AppDataSource.initialize().then(() => {
  console.log("Database connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
