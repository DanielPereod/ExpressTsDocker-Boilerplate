import express, { Express, json } from "express";
import BooksModule from "./modules/books/init";
import dotenv, { DotenvConfigOutput } from "dotenv";
import { pgConnection } from "./config/db";

export default new (class App {
  public dotenv: DotenvConfigOutput = dotenv.config();
  public app: Express = express();
  constructor() {
    this.initServer();
  }

  private initConfig(): void {
    this.app.use(json());
  }

  private async initDatabase(): Promise<void> {
    for (let i = 0; i < 5; i++) {
      try {
        await pgConnection();
        console.log("Connection has been established successfully.");
        break;
      } catch (error) {
        console.log(5 - i, "Retries left");
        console.error("Unable to connect to the database:", error);
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
  }

  private initModules(): void {
    new BooksModule(this.app);
  }

  private async initServer() {
    await this.initDatabase();
    this.initConfig();
    this.initModules();
  }
})();
